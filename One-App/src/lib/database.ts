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

    // Insert initial data if table is empty
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
    
    // Verify the data
    const options = getDebugOptions();
    console.log('Current debug options:', options);
    
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

export default db;
