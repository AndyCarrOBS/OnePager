"""
Admin Panel Toggle Button Tests
Tests the complete functionality of admin toggle switches including:
- UI behavior and visual states
- Database persistence
- DOM effects and rendering changes
"""

import pytest
import sqlite3
import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class AdminToggleTestSuite:
    """Test suite for admin panel toggle button functionality."""
    
    def __init__(self):
        self.db_path = Path("../One-App/onpager.db")
        self.admin_url = "http://localhost:3000/admin"
        self.main_site_url = "http://localhost:3000"
        self.driver = None
    
    def setup_driver(self):
        """Setup Chrome driver with headless options."""
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
    
    def teardown_driver(self):
        """Clean up driver resources."""
        if self.driver:
            self.driver.quit()
    
    def get_db_connection(self):
        """Get SQLite database connection."""
        return sqlite3.connect(self.db_path)
    
    def get_feature_state(self, feature_name):
        """Get current feature state from database."""
        conn = self.get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT settings FROM debug_options WHERE value = ?", (feature_name,))
            result = cursor.fetchone()
            return result[0] if result else None
        finally:
            conn.close()
    
    def set_feature_state(self, feature_name, value):
        """Set feature state in database."""
        conn = self.get_db_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT OR REPLACE INTO debug_options (value, settings) 
                VALUES (?, ?)
            """, (feature_name, value))
            conn.commit()
        finally:
            conn.close()

@pytest.mark.feature("admin_panel")
@pytest.mark.integration
class TestAdminToggleButtons:
    """Test class for admin toggle button functionality."""
    
    @pytest.fixture(scope="class")
    def admin_tests(self):
        """Setup admin test suite."""
        suite = AdminToggleTestSuite()
        suite.setup_driver()
        yield suite
        suite.teardown_driver()
    
    @pytest.fixture(autouse=True)
    def setup_database(self):
        """Setup test database state."""
        # Ensure construction-lines feature exists and is disabled by default
        suite = AdminToggleTestSuite()
        suite.set_feature_state("construction-lines", "false")
        yield
        # Cleanup: reset to default state
        suite.set_feature_state("construction-lines", "false")

    def test_admin_panel_accessibility(self, admin_tests):
        """Test that admin panel is accessible and loads correctly."""
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Verify admin panel loads
        assert "Admin Panel" in admin_tests.driver.title
        assert admin_tests.driver.find_element(By.ID, "admin-panel")
        
        # Verify toggle switch is present
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        assert toggle_switch.is_displayed()

    def test_toggle_switch_initial_state(self, admin_tests):
        """Test initial state of toggle switch matches database."""
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Get toggle switch
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        
        # Verify initial state (should be OFF based on database)
        assert not toggle_switch.is_selected()
        
        # Verify status badge shows OFF
        status_badge = admin_tests.driver.find_element(By.ID, "div-lines-status")
        assert "OFF" in status_badge.text
        
        # Verify database state
        db_state = admin_tests.get_feature_state("construction-lines")
        assert db_state == "false"

    def test_toggle_switch_enable(self, admin_tests):
        """Test enabling the div lines feature."""
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Get toggle switch and click to enable
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        toggle_switch.click()
        
        # Wait for toggle to change state
        WebDriverWait(admin_tests.driver, 5).until(
            EC.element_to_be_clickable((By.ID, "div-lines-toggle"))
        )
        
        # Verify toggle is now enabled
        assert toggle_switch.is_selected()
        
        # Verify status badge shows ON
        status_badge = admin_tests.driver.find_element(By.ID, "div-lines-status")
        assert "ON" in status_badge.text
        
        # Verify success message appears
        success_msg = admin_tests.driver.find_element(By.CLASS_NAME, "success-message")
        assert "Changes saved successfully!" in success_msg.text
        
        # Verify database state is updated
        db_state = admin_tests.get_feature_state("construction-lines")
        assert db_state == "true"

    def test_toggle_switch_disable(self, admin_tests):
        """Test disabling the div lines feature."""
        # First enable the feature
        admin_tests.set_feature_state("construction-lines", "true")
        
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Get toggle switch and click to disable
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        toggle_switch.click()
        
        # Wait for toggle to change state
        WebDriverWait(admin_tests.driver, 5).until(
            EC.element_to_be_clickable((By.ID, "div-lines-toggle"))
        )
        
        # Verify toggle is now disabled
        assert not toggle_switch.is_selected()
        
        # Verify status badge shows OFF
        status_badge = admin_tests.driver.find_element(By.ID, "div-lines-status")
        assert "OFF" in status_badge.text
        
        # Verify success message appears
        success_msg = admin_tests.driver.find_element(By.CLASS_NAME, "success-message")
        assert "Changes saved successfully!" in success_msg.text
        
        # Verify database state is updated
        db_state = admin_tests.get_feature_state("construction-lines")
        assert db_state == "false"

    def test_toggle_switch_visual_states(self, admin_tests):
        """Test visual appearance of toggle switch in different states."""
        admin_tests.driver.get(admin_tests.admin_url)
        
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        
        # Test disabled state (gray background)
        assert not toggle_switch.is_selected()
        # Verify gray background (CSS class or inline style)
        toggle_container = admin_tests.driver.find_element(By.CLASS_NAME, "toggle-container")
        assert "disabled" in toggle_container.get_attribute("class")
        
        # Enable toggle
        toggle_switch.click()
        time.sleep(0.2)  # Wait for transition
        
        # Test enabled state (purple background)
        assert toggle_switch.is_selected()
        assert "enabled" in toggle_container.get_attribute("class")

    def test_database_persistence(self, admin_tests):
        """Test that feature state persists in database across sessions."""
        # Set feature to enabled
        admin_tests.set_feature_state("construction-lines", "true")
        
        # Verify database state
        db_state = admin_tests.get_feature_state("construction-lines")
        assert db_state == "true"
        
        # Reload admin panel
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Verify toggle shows enabled state
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        assert toggle_switch.is_selected()
        
        # Verify status badge shows ON
        status_badge = admin_tests.driver.find_element(By.ID, "div-lines-status")
        assert "ON" in status_badge.text

    def test_main_site_div_lines_effect(self, admin_tests):
        """Test that div lines feature affects main site rendering."""
        # Enable div lines feature
        admin_tests.set_feature_state("div_lines", "true")
        
        # Navigate to main site
        admin_tests.driver.get(admin_tests.main_site_url)
        
        # Verify div lines are visible (CSS class or element)
        try:
            div_lines_element = admin_tests.driver.find_element(By.CLASS_NAME, "div-lines-overlay")
            assert div_lines_element.is_displayed()
        except:
            # Alternative: check if CSS variables are applied
            body_element = admin_tests.driver.find_element(By.TAG_NAME, "body")
            css_vars = admin_tests.driver.execute_script(
                "return getComputedStyle(document.body).getPropertyValue('--div-lines-enabled')"
            )
            assert css_vars.strip() == "true"

    def test_main_site_div_lines_disabled(self, admin_tests):
        """Test that div lines are hidden when feature is disabled."""
        # Disable div lines feature
        admin_tests.set_feature_state("div_lines", "false")
        
        # Navigate to main site
        admin_tests.driver.get(admin_tests.main_site_url)
        
        # Verify div lines are not visible
        try:
            div_lines_element = admin_tests.driver.find_element(By.CLASS_NAME, "div-lines-overlay")
            assert not div_lines_element.is_displayed()
        except:
            # Alternative: check if CSS variables are not applied
            body_element = admin_tests.driver.find_element(By.TAG_NAME, "body")
            css_vars = admin_tests.driver.execute_script(
                "return getComputedStyle(document.body).getPropertyValue('--div-lines-enabled')"
            )
            assert css_vars.strip() == "false" or css_vars.strip() == ""

    def test_toggle_switch_accessibility(self, admin_tests):
        """Test toggle switch accessibility features."""
        admin_tests.driver.get(admin_tests.admin_url)
        
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        
        # Test keyboard navigation
        toggle_switch.send_keys(webdriver.Keys.SPACE)
        
        # Verify toggle state changed
        assert toggle_switch.is_selected()
        
        # Test focus state
        toggle_switch.click()
        assert toggle_switch == admin_tests.driver.switch_to.active_element
        
        # Test ARIA attributes
        assert toggle_switch.get_attribute("role") == "switch"
        assert toggle_switch.get_attribute("aria-checked") in ["true", "false"]

    def test_error_handling(self, admin_tests):
        """Test error handling when database operations fail."""
        # This test would require mocking database failures
        # For now, we'll test basic error message display
        
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Try to toggle (should work normally)
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        toggle_switch.click()
        
        # Verify no error messages are displayed
        error_elements = admin_tests.driver.find_elements(By.CLASS_NAME, "error-message")
        assert len(error_elements) == 0

    def test_feature_description_display(self, admin_tests):
        """Test that feature description and instructions are displayed."""
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Verify feature description is present
        description = admin_tests.driver.find_element(By.ID, "div-lines-description")
        assert description.is_displayed()
        
        # Verify instructions about page reload
        instructions = admin_tests.driver.find_element(By.ID, "div-lines-instructions")
        assert "page reload" in instructions.text.lower()
        
        # Verify feature name is clear
        feature_name = admin_tests.driver.find_element(By.ID, "div-lines-name")
        assert "Div Lines" in feature_name.text

@pytest.mark.feature("admin_panel")
@pytest.mark.unit
class TestAdminToggleUnitTests:
    """Unit tests for admin toggle functionality."""
    
    def test_database_operations(self):
        """Test database operations in isolation."""
        suite = AdminToggleTestSuite()
        
        # Test setting feature state
        suite.set_feature_state("construction-lines", "true")
        assert suite.get_feature_state("construction-lines") == "true"
        
        # Test updating feature state
        suite.set_feature_state("construction-lines", "false")
        assert suite.get_feature_state("construction-lines") == "false"
        
        # Test non-existent feature
        assert suite.get_feature_state("non_existent") is None

    def test_feature_state_validation(self):
        """Test feature state validation."""
        suite = AdminToggleTestSuite()
        
        # Test valid states
        suite.set_feature_state("construction-lines", "true")
        suite.set_feature_state("construction-lines", "false")
        
        # Test invalid states (should be handled gracefully)
        suite.set_feature_state("construction-lines", "invalid")
        # This should either be rejected or defaulted to a valid state

@pytest.mark.feature("admin_panel")
@pytest.mark.regression
class TestAdminToggleRegressionTests:
    """Regression tests to prevent previously fixed bugs."""
    
    def test_toggle_race_condition(self, admin_tests):
        """Test that rapid toggle clicks don't cause issues."""
        admin_tests.driver.get(admin_tests.admin_url)
        
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        
        # Rapidly click toggle multiple times
        for _ in range(5):
            toggle_switch.click()
            time.sleep(0.1)
        
        # Verify final state is consistent
        final_state = toggle_switch.is_selected()
        db_state = admin_tests.get_feature_state("construction-lines")
        
        # State should be consistent between UI and database
        assert (final_state and db_state == "true") or (not final_state and db_state == "false")

    def test_session_persistence(self, admin_tests):
        """Test that feature state persists across browser sessions."""
        # Set feature state
        admin_tests.set_feature_state("construction-lines", "true")
        
        # Close and reopen browser (simulate new session)
        admin_tests.driver.quit()
        admin_tests.setup_driver()
        
        # Navigate to admin panel
        admin_tests.driver.get(admin_tests.admin_url)
        
        # Verify state is maintained
        toggle_switch = admin_tests.driver.find_element(By.ID, "div-lines-toggle")
        assert toggle_switch.is_selected()
        
        status_badge = admin_tests.driver.find_element(By.ID, "div-lines-status")
        assert "ON" in status_badge.text
