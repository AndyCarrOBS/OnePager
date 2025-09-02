#!/usr/bin/env python3
"""
OnPager Test Framework Runner
==============================

A comprehensive test runner that demonstrates all testing capabilities:
- pytest with HTML reporting
- Robot Framework tests
- Feature tracking and regression testing
- Parallel execution
- Custom reporting

Usage:
    python run_tests.py [options]

Options:
    --unit          Run unit tests only
    --integration   Run integration tests only
    --regression    Run regression tests only
    --robot         Run Robot Framework tests only
    --all           Run all tests (default)
    --parallel      Enable parallel execution
    --html          Generate HTML reports
    --features      Show feature tracking information
"""

import argparse
import subprocess
import sys
import os
from pathlib import Path
from datetime import datetime

class TestRunner:
    def __init__(self):
        self.project_root = Path(__file__).parent
        self.reports_dir = self.project_root / "reports"
        self.tests_dir = self.project_root / "tests"
        
    def run_pytest_tests(self, test_type=None, parallel=False, html=True):
        """Run pytest tests with specified options."""
        print(f"\n🔍 Running pytest tests...")
        
        cmd = ["python", "-m", "pytest"]
        
        if test_type:
            cmd.extend([f"tests/{test_type}", "-m", test_type])
        
        if parallel:
            cmd.extend(["-n", "auto"])
        
        if html:
            cmd.extend([
                "--html", str(self.reports_dir / "pytest-report.html"),
                "--self-contained-html"
            ])
        
        cmd.extend(["-v", "--tb=short"])
        
        print(f"Command: {' '.join(cmd)}")
        
        try:
            result = subprocess.run(cmd, cwd=self.project_root, capture_output=True, text=True)
            
            if result.returncode == 0:
                print("✅ pytest tests completed successfully")
            else:
                print("❌ pytest tests failed")
                print(f"Error: {result.stderr}")
            
            return result.returncode == 0
            
        except Exception as e:
            print(f"❌ Error running pytest: {e}")
            return False
    
    def run_robot_tests(self):
        """Run Robot Framework tests."""
        print(f"\n🤖 Running Robot Framework tests...")
        
        robot_file = self.tests_dir / "robot_tests.robot"
        if not robot_file.exists():
            print("⚠️  Robot test file not found, skipping Robot tests")
            return True
        
        cmd = [
            "robot",
            "--outputdir", str(self.reports_dir),
            "--report", "robot-report.html",
            "--log", "robot-log.html",
            str(robot_file)
        ]
        
        print(f"Command: {' '.join(cmd)}")
        
        try:
            result = subprocess.run(cmd, cwd=self.project_root, capture_output=True, text=True)
            
            if result.returncode == 0:
                print("✅ Robot Framework tests completed successfully")
            else:
                print("❌ Robot Framework tests failed")
                print(f"Error: {result.stderr}")
            
            return result.returncode == 0
            
        except Exception as e:
            print(f"❌ Error running Robot tests: {e}")
            return False
    
    def show_feature_tracking(self):
        """Display feature tracking information."""
        print(f"\n📊 Feature Tracking Information")
        print("=" * 50)
        
        tracking_file = self.reports_dir / "feature-tracking.json"
        if tracking_file.exists():
            try:
                import json
                with open(tracking_file, 'r') as f:
                    data = json.load(f)
                
                print(f"Features Tracked: {len(data.get('features', {}))}")
                print(f"Test Results: {len(data.get('test_results', {}))}")
                
                if 'features' in data:
                    print("\nFeature Status:")
                    for feature, info in data['features'].items():
                        status = info.get('status', 'unknown')
                        test_count = len(info.get('tests', []))
                        print(f"  {feature}: {status} ({test_count} tests)")
                        
            except Exception as e:
                print(f"Error reading feature tracking: {e}")
        else:
            print("No feature tracking data available yet. Run tests first.")
    
    def generate_test_summary(self):
        """Generate a comprehensive test summary."""
        print(f"\n📋 Test Execution Summary")
        print("=" * 50)
        
        summary_file = self.reports_dir / "test-summary.txt"
        if summary_file.exists():
            try:
                with open(summary_file, 'r') as f:
                    content = f.read()
                print(content)
            except Exception as e:
                print(f"Error reading summary: {e}")
        else:
            print("No test summary available yet. Run tests first.")
    
    def list_available_tests(self):
        """List all available test files."""
        print(f"\n📁 Available Test Files")
        print("=" * 50)
        
        test_files = []
        for test_type in ['unit', 'integration', 'regression']:
            test_dir = self.tests_dir / test_type
            if test_dir.exists():
                for test_file in test_dir.glob("test_*.py"):
                    test_files.append(f"{test_type}/{test_file.name}")
        
        if test_files:
            for test_file in sorted(test_files):
                print(f"  {test_file}")
        else:
            print("  No test files found")
        
        # Check for Robot tests
        robot_file = self.tests_dir / "robot_tests.robot"
        if robot_file.exists():
            print(f"  robot_tests.robot")
    
    def run_all_tests(self, parallel=False, html=True):
        """Run all available tests."""
        print(f"\n🚀 Running All Tests")
        print("=" * 50)
        
        success = True
        
        # Run pytest tests by type
        for test_type in ['unit', 'integration', 'regression']:
            if not self.run_pytest_tests(test_type, parallel, html):
                success = False
        
        # Run Robot tests
        if not self.run_robot_tests():
            success = False
        
        return success
    
    def main(self):
        """Main entry point."""
        parser = argparse.ArgumentParser(description="OnPager Test Framework Runner")
        parser.add_argument("--unit", action="store_true", help="Run unit tests only")
        parser.add_argument("--integration", action="store_true", help="Run integration tests only")
        parser.add_argument("--regression", action="store_true", help="Run regression tests only")
        parser.add_argument("--robot", action="store_true", help="Run Robot Framework tests only")
        parser.add_argument("--all", action="store_true", help="Run all tests (default)")
        parser.add_argument("--parallel", action="store_true", help="Enable parallel execution")
        parser.add_argument("--html", action="store_true", help="Generate HTML reports")
        parser.add_argument("--features", action="store_true", help="Show feature tracking information")
        parser.add_argument("--list", action="store_true", help="List available test files")
        
        args = parser.parse_args()
        
        print("🎯 OnPager Test Framework")
        print("=" * 50)
        print(f"Project: {self.project_root}")
        print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        # Create reports directory if it doesn't exist
        self.reports_dir.mkdir(exist_ok=True)
        
        if args.list:
            self.list_available_tests()
            return
        
        if args.features:
            self.show_feature_tracking()
            return
        
        # Determine which tests to run
        if args.unit:
            success = self.run_pytest_tests("unit", args.parallel, args.html)
        elif args.integration:
            success = self.run_pytest_tests("integration", args.parallel, args.html)
        elif args.regression:
            success = self.run_pytest_tests("regression", args.parallel, args.html)
        elif args.robot:
            success = self.run_robot_tests()
        else:
            # Default: run all tests
            success = self.run_all_tests(args.parallel, args.html)
        
        # Show results
        if success:
            print(f"\n🎉 All tests completed successfully!")
        else:
            print(f"\n💥 Some tests failed!")
        
        # Show feature tracking and summary
        self.show_feature_tracking()
        self.generate_test_summary()
        
        # Show report locations
        print(f"\n📊 Reports Generated:")
        print(f"  pytest HTML: {self.reports_dir / 'pytest-report.html'}")
        print(f"  Robot HTML: {self.reports_dir / 'robot-report.html'}")
        print(f"  Feature Tracking: {self.reports_dir / 'feature-tracking.json'}")
        print(f"  Test Summary: {self.reports_dir / 'test-summary.txt'}")
        
        sys.exit(0 if success else 1)

if __name__ == "__main__":
    runner = TestRunner()
    runner.main()

