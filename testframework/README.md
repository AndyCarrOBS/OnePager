<!-- markdownlint-disable -->
# OnPager Testing Framework 🧪

A comprehensive, modern Python testing framework designed for **visual testing**, **clear reporting**, and **feature tracing through development** with **regression testing** capabilities.

## ✨ Key Features

- **🎨 Visual System**: HTML reports with charts, graphs, and interactive elements
- **📊 Clear Reports**: Detailed test results, execution times, and coverage metrics
- **🔍 Feature Tracing**: Track features through development lifecycle
- **🔄 Regression Testing**: Prevent bugs from reoccurring
- **⚡ Parallel Execution**: Fast test execution with pytest-xdist
- **🤖 Multiple Frameworks**: pytest + Robot Framework + BDD support

## 🏗️ Architecture

```
testframework/
├── tests/
│   ├── unit/           # Unit tests with feature tracking
│   ├── integration/    # Integration tests for workflows
│   ├── regression/     # Regression tests for bug prevention
│   └── features/       # Feature-specific test suites
├── reports/            # Generated HTML reports and data
├── conftest.py         # pytest configuration and fixtures
├── pytest.ini         # pytest settings and markers
├── run_tests.py        # Comprehensive test runner
└── robot_tests.robot   # Robot Framework BDD tests
```

## 🚀 Quick Start

### 1. Activate Virtual Environment
```bash
cd testframework
source venv/bin/activate
```

### 2. Run All Tests
```bash
python run_tests.py
```

### 3. Run Specific Test Types
```bash
# Unit tests only
python run_tests.py --unit

# Integration tests only
python run_tests.py --integration

# Regression tests only
python run_tests.py --regression

# Robot Framework tests only
python run_tests.py --robot
```

### 4. Enable Parallel Execution
```bash
python run_tests.py --parallel
```

### 5. View Available Tests
```bash
python run_tests.py --list
```

### 6. Show Feature Tracking
```bash
python run_tests.py --features
```

## 📊 Test Types & Examples

### Unit Tests (`tests/unit/`)
Fast, isolated tests for individual functions and components:

```python
@pytest.mark.unit
@pytest.mark.feature("user_authentication")
def test_user_login_validation():
    """Test user login validation logic."""
    username = "testuser"
    password = "testpass123"
    
    is_valid = len(username) > 0 and len(password) >= 8
    assert is_valid is True
```

### Integration Tests (`tests/integration/`)
End-to-end workflow tests:

```python
@pytest.mark.integration
@pytest.mark.feature("user_registration_workflow")
def test_complete_user_registration():
    """Test complete user registration workflow."""
    # Step 1: Validate input data
    # Step 2: Check for existing user
    # Step 3: Create user account
    # Step 4: Send confirmation email
```

### Regression Tests (`tests/regression/`)
Prevent previously fixed bugs from reoccurring:

```python
@pytest.mark.regression
@pytest.mark.feature("user_authentication")
def test_fixed_login_race_condition():
    """
    Regression test for previously fixed login race condition.
    Bug: Multiple rapid login attempts could cause session corruption.
    """
    # Test that the bug doesn't reoccur
```

### Robot Framework Tests (`tests/robot_tests.robot`)
BDD-style acceptance tests:

```robotframework
*** Test Cases ***
User Registration Workflow
    [Documentation]    Test complete user registration process
    [Tags]    smoke    user_registration_workflow
    Given user is on registration page
    When user enters valid registration details
    And user submits registration form
    Then user account should be created successfully
```

## 🎯 Feature Tracking

The framework automatically tracks features through development:

- **Feature Creation**: Mark tests with `@pytest.mark.feature("feature_name")`
- **Development Status**: Track feature progress (development, testing, production)
- **Test Coverage**: See which tests cover each feature
- **Regression Data**: Monitor feature stability over time

### Feature Markers
```python
@pytest.mark.feature("user_authentication")      # Core authentication
@pytest.mark.feature("content_management")       # Content operations
@pytest.mark.feature("search_functionality")     # Search capabilities
@pytest.mark.feature("user_registration_workflow") # User onboarding
```

## 📈 Reporting & Visualization

### HTML Reports
- **pytest-html**: Beautiful, interactive HTML reports
- **Robot Framework**: Comprehensive test execution logs
- **Feature Tracking**: JSON-based feature development data

### Report Locations
```
reports/
├── pytest-report.html      # pytest HTML report
├── robot-report.html       # Robot Framework report
├── robot-log.html          # Robot Framework log
├── feature-tracking.json   # Feature development data
└── test-summary.txt        # Text summary
```

### Custom Markers
```python
@pytest.mark.smoke          # Critical path tests
@pytest.mark.regression     # Regression prevention
@pytest.mark.integration    # Integration tests
@pytest.mark.unit          # Unit tests
@pytest.mark.slow          # Slow-running tests
@pytest.mark.feature       # Feature-specific tests
@pytest.mark.bug           # Bug-related tests
```

## 🔧 Configuration

### pytest.ini
```ini
[tool:pytest]
addopts = 
    --html=reports/pytest-report.html
    --self-contained-html
    -n auto                    # Parallel execution
    --dist=loadfile           # Load balancing
markers =
    smoke: marks tests as smoke tests
    regression: marks tests as regression tests
    feature: marks tests related to specific features
```

### conftest.py
- **Feature Tracker**: Automatic feature tracking
- **Custom Fixtures**: Shared test utilities
- **Session Hooks**: Enhanced reporting

## 🚀 Advanced Usage

### Parallel Execution
```bash
# Auto-detect CPU cores
python run_tests.py --parallel

# Manual core specification
pytest -n 4
```

### Test Selection
```bash
# Run tests by marker
pytest -m "smoke and not slow"

# Run tests by feature
pytest -m "feature(user_authentication)"

# Run tests by path
pytest tests/unit/
```

### Custom Test Execution
```bash
# Run specific test file
pytest tests/unit/test_core_functions.py

# Run specific test function
pytest tests/unit/test_core_functions.py::test_user_login_validation

# Run tests with specific pattern
pytest -k "login"
```

## 📋 Best Practices

### 1. Feature Marking
- Always mark tests with relevant features
- Use consistent feature naming conventions
- Update feature status as development progresses

### 2. Test Organization
- Group tests by type (unit, integration, regression)
- Use descriptive test names and docstrings
- Keep tests focused and atomic

### 3. Regression Testing
- Create regression tests for every bug fix
- Include detailed bug descriptions in test docstrings
- Monitor regression test stability

### 4. Reporting
- Review HTML reports after each test run
- Track feature development progress
- Use test summaries for stakeholder updates

## 🛠️ Troubleshooting

### Common Issues

1. **Virtual Environment Not Activated**
   ```bash
   source venv/bin/activate
   ```

2. **Missing Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Test Discovery Issues**
   ```bash
   python run_tests.py --list
   ```

4. **Report Generation Failures**
   - Ensure `reports/` directory exists
   - Check file permissions
   - Verify pytest-html installation

### Debug Mode
```bash
# Verbose pytest output
pytest -v -s

# Show test collection
pytest --collect-only

# Run with debugger
pytest --pdb
```

## 📚 Additional Resources

- [pytest Documentation](https://docs.pytest.org/)
- [Robot Framework User Guide](https://robotframework.org/robotframework/)
- [pytest-html Documentation](https://pytest-html.readthedocs.io/)
- [pytest-xdist Documentation](https://pytest-xdist.readthedocs.io/)

## 🤝 Contributing

1. Follow the existing test structure
2. Use appropriate markers and feature tags
3. Include comprehensive docstrings
4. Add regression tests for bug fixes
5. Update feature tracking as needed

---

**Happy Testing! 🎉**

This framework provides everything your team needs for:
- **Visual testing** with beautiful HTML reports
- **Clear reporting** with detailed metrics and insights
- **Feature tracing** through the entire development lifecycle
- **Regression testing** to prevent bugs from reoccurring

