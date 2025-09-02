*** Settings ***
Documentation     OnPager Application Test Suite
...               Demonstrates Robot Framework capabilities for visual testing
Library           SeleniumLibrary
Suite Setup       Initialize Test Environment
Suite Teardown    Cleanup Test Environment

*** Variables ***
${BROWSER}        headlesschrome
${BASE_URL}       http://localhost:3000
${TIMEOUT}        10s

*** Test Cases ***
User Registration Workflow
    [Documentation]    Test complete user registration process
    [Tags]    smoke    user_registration_workflow
    Given user is on registration page
    When user enters valid registration details
    And user submits registration form
    Then user account should be created successfully
    And confirmation email should be sent

User Login Workflow
    [Documentation]    Test user login functionality
    [Tags]    smoke    user_authentication
    Given user is on login page
    When user enters valid credentials
    And user submits login form
    Then user should be logged in successfully
    And user should see dashboard

Content Creation Workflow
    [Documentation]    Test content creation and publishing
    [Tags]    integration    content_creation_workflow
    Given user is logged in
    And user navigates to content creation page
    When user creates new content
    And user publishes content
    Then content should be published successfully
    And content should be visible to other users

Search Functionality
    [Documentation]    Test search and content discovery
    [Tags]    integration    search_and_discovery
    Given user is on search page
    When user enters search query
    And user submits search
    Then search results should be displayed
    And results should be relevant to query

*** Keywords ***
Initialize Test Environment
    [Documentation]    Setup test environment
    Set Selenium Timeout    ${TIMEOUT}
    Set Selenium Speed    0.5s
    Log    Test environment initialized

Cleanup Test Environment
    [Documentation]    Cleanup test environment
    Close All Browsers
    Log    Test environment cleaned up

User is on registration page
    [Documentation]    Navigate to user registration page
    Go To    ${BASE_URL}/register
    Wait Until Page Contains Element    id=registration-form
    Log    User is on registration page

User enters valid registration details
    [Documentation]    Enter valid user registration information
    Input Text    id=username    testuser123
    Input Text    id=email    testuser@example.com
    Input Password    id=password    SecurePass123!
    Input Password    id=confirm-password    SecurePass123!
    Log    Valid registration details entered

User submits registration form
    [Documentation]    Submit the registration form
    Click Button    id=register-button
    Wait Until Page Contains    Registration successful
    Log    Registration form submitted

User account should be created successfully
    [Documentation]    Verify user account creation
    Page Should Contain    Account created successfully
    Log    User account created successfully

Confirmation email should be sent
    [Documentation]    Verify confirmation email was sent
    Page Should Contain    Please check your email
    Log    Confirmation email sent

User is on login page
    [Documentation]    Navigate to user login page
    Go To    ${BASE_URL}/login
    Wait Until Page Contains Element    id=login-form
    Log    User is on login page

User enters valid credentials
    [Documentation]    Enter valid login credentials
    Input Text    id=username    testuser123
    Input Password    id=password    SecurePass123!
    Log    Valid credentials entered

User submits login form
    [Documentation]    Submit the login form
    Click Button    id=login-button
    Wait Until Page Contains Element    id=dashboard
    Log    Login form submitted

User should be logged in successfully
    [Documentation]    Verify successful login
    Page Should Contain Element    id=user-profile
    Log    User logged in successfully

User should see dashboard
    [Documentation]    Verify dashboard is displayed
    Page Should Contain    Welcome to OnPager
    Log    Dashboard displayed

User is logged in
    [Documentation]    Ensure user is authenticated
    Go To    ${BASE_URL}/login
    Input Text    id=username    testuser123
    Input Password    id=password    SecurePass123!
    Click Button    id=login-button
    Wait Until Page Contains Element    id=dashboard
    Log    User is logged in

User navigates to content creation page
    [Documentation]    Navigate to content creation page
    Click Link    id=create-content-link
    Wait Until Page Contains Element    id=content-form
    Log    User navigated to content creation page

User creates new content
    [Documentation]    Create new content
    Input Text    id=content-title    Test Article Title
    Input Text    id=content-body    This is a test article content for testing purposes.
    Input Text    id=content-tags    test, article, automation
    Select From List By Value    id=content-category    general
    Log    New content created

User publishes content
    [Documentation]    Publish the created content
    Click Button    id=publish-button
    Wait Until Page Contains    Content published successfully
    Log    Content published

Content should be published successfully
    [Documentation]    Verify content publication
    Page Should Contain    Content published successfully
    Log    Content published successfully

Content should be visible to other users
    [Documentation]    Verify content visibility
    Go To    ${BASE_URL}/content
    Page Should Contain    Test Article Title
    Log    Content visible to other users

User is on search page
    [Documentation]    Navigate to search page
    Go To    ${BASE_URL}/search
    Wait Until Page Contains Element    id=search-form
    Log    User is on search page

User enters search query
    [Documentation]    Enter search query
    Input Text    id=search-query    test article
    Log    Search query entered

User submits search
    [Documentation]    Submit search request
    Click Button    id=search-button
    Wait Until Page Contains Element    id=search-results
    Log    Search submitted

Search results should be displayed
    [Documentation]    Verify search results are shown
    Page Should Contain Element    id=search-results
    Log    Search results displayed

Results should be relevant to query
    [Documentation]    Verify search result relevance
    Page Should Contain    Test Article Title
    Log    Search results are relevant

