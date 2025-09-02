-- Content Management Database Schema
-- For OORO Homepage Admin System

-- Sections table
CREATE TABLE sections (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    display_order INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Section content table
CREATE TABLE section_content (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    section_id VARCHAR(50) NOT NULL,
    content_key VARCHAR(100) NOT NULL,
    content_type ENUM('text', 'link', 'image', 'button') NOT NULL,
    content_value TEXT NOT NULL,
    content_meta JSON,
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id),
    UNIQUE KEY unique_section_content (section_id, content_key, language)
);

-- Section positioning table
CREATE TABLE section_positioning (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    section_id VARCHAR(50) NOT NULL,
    top_position INTEGER NOT NULL,
    left_position INTEGER NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    z_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id),
    UNIQUE KEY unique_section_position (section_id)
);

-- Section styles table
CREATE TABLE section_styles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    section_id VARCHAR(50) NOT NULL,
    style_key VARCHAR(100) NOT NULL,
    style_value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES sections(id),
    UNIQUE KEY unique_section_style (section_id, style_key)
);

-- Insert default sections
INSERT INTO sections (id, name, type, display_order) VALUES
('header', 'Header Navigation', 'header', 1),
('user-experience', 'User Experience Hero', 'hero', 2),
('featured-content', 'Featured Content Showcase', 'content-showcase', 3),
('key-features', 'Key Features Grid', 'features-grid', 4),
('entertainment-apps', 'Entertainment Apps', 'apps-showcase', 5),
('statistics', 'Statistics Display', 'stats-display', 6),
('partners', 'Partners Showcase', 'partners-showcase', 7),
('first-tv-platform-mena', 'First TV Platform MENA', 'partnership-cta', 8),
('call-to-action', 'Call to Action Footer', 'footer', 9);

-- Insert default content for header
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('header', 'logo_alt', 'text', 'OORO logo'),
('header', 'logo_src', 'image', '/img/ooro-logo-1.png'),
('header', 'nav_about', 'text', 'About OORO'),
('header', 'nav_devices', 'text', 'Devices'),
('header', 'nav_content', 'text', 'Content'),
('header', 'nav_where_to_buy', 'text', 'Where to Buy'),
('header', 'login_text', 'text', 'Login'),
('header', 'arabic_toggle', 'text', 'ع');

-- Insert default content for user experience section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('user-experience', 'heading', 'text', 'First TV Platform For MENA'),
('user-experience', 'subtitle', 'text', 'Stream, discover, and enjoy content in Arabic with OORO-powered devices designed for the Middle East and North Africa'),
('user-experience', 'background_image', 'image', '/img/1-2345685.png'),
('user-experience', 'brand_logo', 'image', '/img/frame-1618873226.png');

-- Insert default content for featured content section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('featured-content', 'heading', 'text', 'Don\'t Miss This Show'),
('featured-content', 'description', 'text', 'Browse movies, episodes, live TV, and more from across your favorite apps. It\'s easier than ever to discover what to watch.'),
('featured-content', 'showcase_image', 'image', '/img/frame-1000005164.svg'),
('featured-content', 'cta_button_text', 'text', 'Explore now'),
('featured-content', 'cta_button_href', 'link', '#');

-- Insert default content for key features section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('key-features', 'feature_1_title', 'text', 'Entertainment Apps'),
('key-features', 'feature_1_description', 'text', 'Youtube , shahid , Watch it and so much more'),
('key-features', 'feature_2_title', 'text', 'OORO Cast'),
('key-features', 'feature_2_description', 'text', 'Lorem Ipsum Lorem Ipsum\nLorem Ipsum'),
('key-features', 'feature_3_title', 'text', 'OORO Browser'),
('key-features', 'feature_3_description', 'text', 'Lorem Ipsum Lorem Ipsum\nLorem Ipsum'),
('key-features', 'feature_4_title', 'text', 'OORO Media player'),
('key-features', 'feature_4_description', 'text', 'Lorem Ipsum Lorem Ipsum\nLorem Ipsum');

-- Insert default content for entertainment apps section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('entertainment-apps', 'heading', 'text', 'Entertainment apps'),
('entertainment-apps', 'subtitle', 'text', 'Biggest streaming services in MENA are available now'),
('entertainment-apps', 'apps_logo', 'image', '/img/group-1321314557.png');

-- Insert default content for statistics section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('statistics', 'stat_1_value', 'text', '50+'),
('statistics', 'stat_1_label', 'text', 'Arabic Channels'),
('statistics', 'stat_2_value', 'text', '1M+'),
('statistics', 'stat_2_label', 'text', 'Hours Watched');

-- Insert default content for partners section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('partners', 'heading', 'text', 'Our Partners'),
('partners', 'partners_logo', 'image', '/img/frame-1618873234.svg');

-- Insert default content for first TV platform MENA section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('first-tv-platform-mena', 'heading', 'text', 'Let\'s Connect'),
('first-tv-platform-mena', 'description', 'text', 'Discover partnership opportunities with OORO and get your content viewed even more'),
('first-tv-platform-mena', 'background_image', 'image', '/img/1-unconnected-featured-content-1.png'),
('first-tv-platform-mena', 'cta_button_text', 'text', 'Let\'s connect'),
('first-tv-platform-mena', 'cta_button_href', 'link', '#');

-- Insert default content for call to action section
INSERT INTO section_content (section_id, content_key, content_type, content_value) VALUES
('call-to-action', 'logo_src', 'image', '/img/ooro-logo-1-2.png'),
('call-to-action', 'tagline', 'text', 'Questions? Comments? Concerns?'),
('call-to-action', 'copyright', 'text', '© 2025 Transparent. All rights reserved.'),
('call-to-action', 'nav_about', 'text', 'About OORO'),
('call-to-action', 'nav_devices', 'text', 'Devices'),
('call-to-action', 'nav_content', 'text', 'Content'),
('call-to-action', 'nav_where_to_buy', 'text', 'Where to Buy'),
('call-to-action', 'legal_privacy', 'text', 'Privacy Policy'),
('call-to-action', 'legal_terms', 'text', 'Terms & Conditions'),
('call-to-action', 'support_faq', 'text', 'F.A.Qs');

-- Insert default positioning for all sections
INSERT INTO section_positioning (section_id, top_position, left_position, width, height) VALUES
('header', 0, 0, 1450, 62),
('user-experience', 181, 289, 907, 520),
('featured-content', 693, 135, 1438, 566),
('key-features', 1200, 200, 1200, 400),
('entertainment-apps', 4060, 8, 1421, 200),
('statistics', 5076, 375, 800, 259),
('partners', 5451, 185, 1116, 100),
('first-tv-platform-mena', 5732, 22, 1441, 623),
('call-to-action', 6471, -1, 1442, 370);
