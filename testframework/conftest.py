"""
Pytest configuration and shared fixtures for OnPager testing framework.
Provides enhanced reporting, feature tracing, and test metadata collection.
"""

import pytest
import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional

# Create reports directory if it doesn't exist
REPORTS_DIR = Path("reports")
REPORTS_DIR.mkdir(exist_ok=True)

class FeatureTracker:
    """Tracks feature development and testing progress."""
    
    def __init__(self):
        self.features = {}
        self.test_results = {}
        self.regression_data = {}
    
    def add_feature(self, feature_name: str, description: str, tags: list = None):
        """Add a new feature to track."""
        self.features[feature_name] = {
            'description': description,
            'tags': tags or [],
            'created': datetime.now().isoformat(),
            'tests': [],
            'status': 'development'
        }
    
    def add_test_to_feature(self, feature_name: str, test_name: str, test_type: str):
        """Associate a test with a feature."""
        if feature_name in self.features:
            self.features[feature_name]['tests'].append({
                'name': test_name,
                'type': test_type,
                'added': datetime.now().isoformat()
            })
    
    def update_feature_status(self, feature_name: str, status: str):
        """Update feature development status."""
        if feature_name in self.features:
            self.features[feature_name]['status'] = status
    
    def save_report(self):
        """Save feature tracking report to JSON."""
        report_path = REPORTS_DIR / "feature-tracking.json"
        with open(report_path, 'w') as f:
            json.dump({
                'features': self.features,
                'test_results': self.test_results,
                'regression_data': self.regression_data,
                'generated': datetime.now().isoformat()
            }, f, indent=2)

# Global feature tracker instance
feature_tracker = FeatureTracker()

@pytest.fixture(scope="session")
def feature_tracker_fixture():
    """Provide access to the global feature tracker."""
    return feature_tracker

@pytest.fixture(scope="session")
def test_metadata():
    """Provide test metadata for reporting."""
    return {
        'project': 'OnPager',
        'version': '1.0.0',
        'platform': 'Linux',
        'python_version': '3.10.12',
        'test_framework': 'pytest',
        'timestamp': datetime.now().isoformat()
    }

@pytest.fixture(autouse=True)
def track_test_execution(request, feature_tracker_fixture):
    """Automatically track test execution for feature tracing."""
    test_name = request.node.name
    test_markers = [marker.name for marker in request.node.iter_markers()]
    
    # Extract feature information from test markers or name
    feature_name = None
    for marker in request.node.iter_markers():
        if marker.name == 'feature':
            feature_name = marker.args[0] if marker.args else 'unknown'
            break
    
    if feature_name:
        feature_tracker_fixture.add_test_to_feature(
            feature_name, 
            test_name, 
            'pytest'
        )
    
    yield
    
    # After test execution, update results
    if hasattr(request.node, 'rep_call') and request.node.rep_call.failed:
        if feature_name:
            feature_tracker_fixture.test_results[test_name] = {
                'status': 'failed',
                'feature': feature_name,
                'timestamp': datetime.now().isoformat()
            }

def pytest_sessionfinish(session, exitstatus):
    """Save feature tracking report when pytest session ends."""
    feature_tracker.save_report()
    
    # Generate summary report
    summary_path = REPORTS_DIR / "test-summary.txt"
    with open(summary_path, 'w') as f:
        f.write(f"OnPager Test Execution Summary\n")
        f.write(f"=============================\n")
        f.write(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"Exit Status: {exitstatus}\n")
        f.write(f"Total Tests: {session.testscollected}\n")
        f.write(f"Features Tracked: {len(feature_tracker.features)}\n")
        f.write(f"\nFeature Status:\n")
        for feature, data in feature_tracker.features.items():
            f.write(f"  {feature}: {data['status']} ({len(data['tests'])} tests)\n")

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Capture test results for enhanced reporting."""
    outcome = yield
    rep = outcome.get_result()
    
    # Store test result for feature tracking
    if rep.when == "call":
        item.rep_call = rep

