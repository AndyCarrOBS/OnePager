import Database from 'better-sqlite3';
import path from 'path';
import { DatabaseFeature } from '@/types/features';

// Create database in the One-App project root for persistence
const dbPath = path.join(process.cwd(), 'onpager.db');

// Ensure the database file exists and is writable
let db: Database.Database;
try {
  db = new Database(dbPath);
  console.log(`Database connected to: ${dbPath}`);
} catch (error) {
  console.error('Failed to connect to database:', error);
  throw error;
}

// Initialize database and create tables
export function initDatabase(): void {
  try {
    console.log('Initializing database...');
    
    // Create debug-options table with proper schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS debug_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL UNIQUE,
        settings TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create home-entertainment table
    db.exec(`
      CREATE TABLE IF NOT EXISTS home_entertainment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        button_text TEXT NOT NULL,
        button_url TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create home-key-features table
    db.exec(`
      CREATE TABLE IF NOT EXISTS home_key_features (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        feature1_image TEXT NOT NULL,
        feature1_title TEXT NOT NULL,
        feature1_subtitle TEXT NOT NULL,
        feature1_url TEXT NOT NULL,
        feature2_image TEXT NOT NULL,
        feature2_title TEXT NOT NULL,
        feature2_subtitle TEXT NOT NULL,
        feature2_url TEXT NOT NULL,
        feature3_image TEXT NOT NULL,
        feature3_title TEXT NOT NULL,
        feature3_subtitle TEXT NOT NULL,
        feature3_url TEXT NOT NULL,
        feature4_image TEXT NOT NULL,
        feature4_title TEXT NOT NULL,
        feature4_subtitle TEXT NOT NULL,
        feature4_url TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert initial data if debug_options table is empty
    const count = db.prepare('SELECT COUNT(*) as count FROM debug_options').get() as { count: number };
    console.log(`Current debug options count: ${count.count}`);
    
    if (count.count === 0) {
      const insert = db.prepare('INSERT OR IGNORE INTO debug_options (value, settings) VALUES (?, ?)');
      
      // Insert default features
      const defaultFeatures = [
        ['construction-lines', 'false'],
        ['grid-overlay', 'false'],
        ['element-highlighting', 'false'],
        ['performance-mode', 'false'],
        ['lazy-loading', 'true'],
        ['debug-logs', 'false'],
        ['performance-metrics', 'false'],
        ['dark-mode', 'false'],
        ['animations', 'true'],
        ['breadcrumbs', 'false'],
        ['search-suggestions', 'true']
      ];
      
      defaultFeatures.forEach(([value, settings]) => {
        insert.run(value, settings);
      });
      
      console.log('Database initialized with default features');
    } else {
      console.log('Database already has data, skipping initialization');
    }

    // Insert home entertainment content if table is empty
    const homeCount = db.prepare('SELECT COUNT(*) as count FROM home_entertainment').get() as { count: number };
    console.log(`Current home entertainment count: ${homeCount.count}`);
    
    if (homeCount.count === 0) {
      const insertHome = db.prepare('INSERT OR IGNORE INTO home_entertainment (title, subtitle, button_text, button_url) VALUES (?, ?, ?, ?)');
      
      // Insert current content from the screen
      insertHome.run(
        'First TV Platform For MENA',
        'Stream, discover, and enjoy content in Arabic with OORO-powered devices designed for the Middle East and North Africa',
        'Explore OORO Devices',
        '/devices'
      );
      
      console.log('Database initialized with home entertainment content');
    } else {
      console.log('Home entertainment table already has data, skipping initialization');
    }

    // Insert home key features content if table is empty
    const keyFeaturesCount = db.prepare('SELECT COUNT(*) as count FROM home_key_features').get() as { count: number };
    console.log(`Current home key features count: ${keyFeaturesCount.count}`);
    
    if (keyFeaturesCount.count === 0) {
      const insertKeyFeatures = db.prepare(`
        INSERT OR IGNORE INTO home_key_features (
          title, subtitle,
          feature1_image, feature1_title, feature1_subtitle, feature1_url,
          feature2_image, feature2_title, feature2_subtitle, feature2_url,
          feature3_image, feature3_title, feature3_subtitle, feature3_url,
          feature4_image, feature4_title, feature4_subtitle, feature4_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      // Insert current content from the KeyFeaturesSection
      insertKeyFeatures.run(
        'Key Features',
        'Discover the powerful features that make OORO the ultimate TV platform for MENA',
        '/img/vector-4.svg',
        'Entertainment Apps',
        'Youtube , shahid , Watch it and so much more',
        '/entertainment',
        '/img/frame-1618872926.svg',
        'OORO Cast',
        'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        '/cast',
        '/img/vector-2.svg',
        'OORO Browser',
        'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        '/browser',
        '/img/vector-4.svg',
        'OORO Media player',
        'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        '/media-player'
      );
      
      console.log('Database initialized with home key features content');
    } else {
      console.log('Home key features table already has data, skipping initialization');
    }
    
    // Verify the data
    // Remove these calls to avoid circular dependency
    // const options = getDebugOptions();
    // console.log('Current debug options:', options);
    
    // Remove these calls to avoid circular dependency
    // const homeContent = getHomeEntertainment();
    // console.log('Current home entertainment content:', homeContent);
    
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Get all debug options
export function getDebugOptions(): DatabaseFeature[] {
  try {
    const stmt = db.prepare('SELECT * FROM debug_options ORDER BY value');
    const results = stmt.all() as DatabaseFeature[];
    console.log('Retrieved debug options:', results);
    return results;
  } catch (error) {
    console.error('Error getting debug options:', error);
    return [];
  }
}

// Get home entertainment content
export function getHomeEntertainment(): any {
  try {
    const stmt = db.prepare('SELECT * FROM home_entertainment ORDER BY id DESC LIMIT 1');
    const result = stmt.get() as any;
    console.log('Retrieved home entertainment content:', result);
    return result;
  } catch (error) {
    console.error('Error getting home entertainment content:', error);
    return null;
  }
}

// Get specific debug option by value
export function getDebugOption(value: string): DatabaseFeature | null {
  try {
    const stmt = db.prepare('SELECT * FROM debug_options WHERE value = ?');
    const result = stmt.get(value) as DatabaseFeature | undefined;
    console.log(`Retrieved debug option for ${value}:`, result);
    return result || null;
  } catch (error) {
    console.error('Error getting debug option:', error);
    return null;
  }
}

// Update debug option
export function updateDebugOption(value: string, settings: string): Database.RunResult {
  try {
    console.log(`Updating debug option: ${value} = ${settings}`);
    
    // Use INSERT OR REPLACE to handle both insert and update
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO debug_options (value, settings, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `);
    const result = stmt.run(value, settings);
    
    console.log(`Update result:`, result);
    
    // Verify the update
    const updated = getDebugOption(value);
    console.log(`Verified update:`, updated);
    
    return result;
  } catch (error) {
    console.error('Error updating debug option:', error);
    throw error;
  }
}

// Batch update multiple debug options
export function batchUpdateDebugOptions(updates: Array<{ value: string; settings: string }>): void {
  try {
    console.log(`Batch updating ${updates.length} debug options`);
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO debug_options (value, settings, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `);
    
    const transaction = db.transaction(() => {
      updates.forEach(({ value, settings }) => {
        stmt.run(value, settings);
      });
    });
    
    transaction();
    console.log('Batch update completed successfully');
    
  } catch (error) {
    console.error('Error in batch update:', error);
    throw error;
  }
}

// Close database connection
export function closeDatabase(): void {
  if (db) {
    db.close();
    console.log('Database connection closed');
  }
}

// Get home key features content
export function getHomeKeyFeatures(): any {
  try {
    console.log('getHomeKeyFeatures: Starting...');
    console.log('getHomeKeyFeatures: Database path:', dbPath);
    console.log('getHomeKeyFeatures: Database object:', db);
    
    // Check if table exists
    const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='home_key_features'");
    const tableExists = tableCheck.get();
    console.log('getHomeKeyFeatures: Table exists check:', tableExists);
    
    // Count rows in table
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM home_key_features');
    const count = countStmt.get() as { count: number };
    console.log('getHomeKeyFeatures: Row count:', count);
    
    const stmt = db.prepare('SELECT * FROM home_key_features ORDER BY id DESC LIMIT 1');
    console.log('getHomeKeyFeatures: Statement prepared');
    
    const result = stmt.get() as { id: number } | undefined;
    console.log('getHomeKeyFeatures: Query result:', result);
    console.log('getHomeKeyFeatures: Result type:', typeof result);
    console.log('getHomeKeyFeatures: Result keys:', result ? Object.keys(result) : 'null');
    
    if (result && result.id > 0) {
      console.log('getHomeKeyFeatures: Found data with id > 0');
    } else {
      console.log('getHomeKeyFeatures: No data found or id <= 0');
    }
    
    return result;
  } catch (error) {
    console.error('getHomeKeyFeatures: Error:', error);
    return null;
  }
}

// export default db;
