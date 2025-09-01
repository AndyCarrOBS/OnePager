"""
Configuration and fixtures for admin toggle button tests.
Provides database setup, webdriver management, and test utilities.
"""

import pytest
import sqlite3
import os
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

# Test configuration
ADMIN_TEST_CONFIG = {
    'db_path': Path("../One-App/onpager.db"),
    'admin_url': "http://localhost:3000/admin",
    'main_site_url': "http://localhost:3000",
    'chrome_driver_path': None,  # Will auto-detect
    'headless': True,
    'timeout': 10
}

class AdminTestDatabase:
    """Database utility class for admin toggle tests."""
    
    def __init__(self, db_path):
        self.db_path = db_path
        self.original_states = {}
    
    def get_connection(self):
        """Get database connection."""
        if not self.db_path.exists():
            pytest.skip(f"Database not found at {self.db_path}")
        return sqlite3.connect(self.db_path)
    
    def get_feature_state(self, feature_name):
        """Get current feature state."""
        conn = self.get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT value FROM debug_options WHERE name = ?", (feature_name,))
            result = cursor.fetchone()
            return result[0] if result else None
        finally:
            conn.close()
    
    def set_feature_state(self, feature_name, value):
        """Set feature state."""
        conn = self.get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT OR REPLACE INTO debug_options (name, value, updated_at) 
                VALUES (?, ?, datetime('now'))
            """, (feature_name, value))
            conn.commit()
        finally:
            conn.close()
    
    def backup_feature_states(self):
        """Backup current feature states for restoration."""
        features = ['construction-lines']  # Add more features as needed
        for feature in features:
            state = self.get_feature_state(feature)
            if state is not None:
                self.original_states[feature] = state
    
    def restore_feature_states(self):
        """Restore original feature states."""
        for feature, state in self.original_states.items():
            self.set_feature_state(feature, state)

class AdminTestWebDriver:
    """WebDriver management for admin toggle tests."""
    
    def __init__(self, config):
        self.config = config
        self.driver = None
    
    def setup_driver(self):
        """Setup Chrome WebDriver."""
        options = Options()
        
        if self.config['headless']:
            options.add_argument("--headless")
        
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--disable-gpu")
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--disable-web-security")
        options.add_argument("--allow-running-insecure-content")
        
        # Add user agent for consistent testing
        options.add_argument("--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36")
        
        try:
            self.driver = webdriver.Chrome(options=options)
            self.driver.implicitly_wait(self.config['timeout'])
            self.driver.set_page_load_timeout(self.config['timeout'])
            return self.driver
        except Exception as e:
            pytest.skip(f"Chrome WebDriver setup failed: {e}")
    
    def teardown_driver(self):
        """Clean up WebDriver."""
        if self.driver:
            try:
                self.driver.quit()
            except:
                pass
            self.driver = None

@pytest.fixture(scope="session")
def admin_test_config():
    """Provide admin test configuration."""
    return ADMIN_TEST_CONFIG

@pytest.fixture(scope="session")
def admin_database():
    """Provide database utility for admin tests."""
    db = AdminTestDatabase(ADMIN_TEST_CONFIG['db_path'])
    db.backup_feature_states()
    yield db
    db.restore_feature_states()

@pytest.fixture(scope="function")
def admin_webdriver(admin_test_config):
    """Provide WebDriver for admin tests."""
    webdriver_manager = AdminTestWebDriver(admin_test_config)
    driver = webdriver_manager.setup_driver()
    yield driver
    webdriver_manager.teardown_driver()

@pytest.fixture(scope="function")
def admin_test_session(admin_database, admin_webdriver):
    """Provide complete admin test session."""
    # Reset database to known state
    admin_database.set_feature_state("div_lines", "false")
    
    yield {
        'database': admin_database,
        'driver': admin_webdriver,
        'config': ADMIN_TEST_CONFIG
    }
    
    # Cleanup: reset to default state
    admin_database.set_feature_state("div_lines", "false")

@pytest.fixture(scope="function")
def construction_lines_disabled(admin_database):
    """Ensure construction lines feature is disabled."""
    admin_database.set_feature_state("construction-lines", "false")
    yield
    admin_database.set_feature_state("construction-lines", "false")

@pytest.fixture(scope="function")
def construction_lines_enabled(admin_database):
    """Ensure construction lines feature is enabled."""
    admin_database.set_feature_state("construction-lines", "true")
    yield
    admin_database.set_feature_state("construction-lines", "false")

# Custom markers for admin tests
def pytest_configure(config):
    """Configure custom markers."""
    config.addinivalue_line(
        "markers", "admin_panel: marks tests as admin panel related"
    )
    config.addinivalue_line(
        "markers", "toggle_button: marks tests as toggle button related"
    )
    config.addinivalue_line(
        "markers", "database_persistence: marks tests as database persistence related"
    )
    config.addinivalue_line(
        "markers", "visual_effect: marks tests as visual effect related"
    )

# Test utilities
def wait_for_element(driver, by, value, timeout=10):
    """Wait for element to be present and visible."""
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    
    wait = WebDriverWait(driver, timeout)
    return wait.until(EC.visibility_of_element_located((by, value)))

def wait_for_element_clickable(driver, by, value, timeout=10):
    """Wait for element to be clickable."""
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    
    wait = WebDriverWait(driver, timeout)
    return wait.until(EC.element_to_be_clickable((by, value)))

def verify_database_state(database, feature_name, expected_value):
    """Verify feature state in database."""
    actual_value = database.get_feature_state(feature_name)
    assert actual_value == expected_value, \
        f"Database state mismatch for {feature_name}: expected {expected_value}, got {actual_value}"

def verify_ui_state(driver, element_id, expected_selected_state):
    """Verify UI element state."""
    element = driver.find_element("id", element_id)
    actual_state = element.is_selected()
    assert actual_state == expected_selected_state, \
        f"UI state mismatch for {element_id}: expected {expected_selected_state}, got {actual_state}"

def verify_success_message(driver):
    """Verify success message is displayed."""
    try:
        success_msg = wait_for_element(driver, "class name", "success-message", timeout=5)
        assert "Changes saved successfully!" in success_msg.text
        return True
    except:
        return False

def verify_error_message(driver):
    """Verify error message is displayed."""
    try:
        error_msg = driver.find_element("class name", "error-message")
        return error_msg.is_displayed()
    except:
        return False
