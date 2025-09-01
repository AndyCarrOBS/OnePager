import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Create database in the One-App project root for persistence
const dbPath = path.join(process.cwd(), 'onpager.db');

// Ensure the database file exists and is writable
let db;
try {
  db = new Database(dbPath);
  console.log(`Database connected to: ${dbPath}`);
} catch (error) {
  console.error('Failed to connect to database:', error);
  throw error;
}

// Initialize database and create tables
export function initDatabase() {
  try {
    console.log('Initializing database...');
    
    // Create debug-options table
    db.exec(`
      CREATE TABLE IF NOT EXISTS debug_options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value TEXT NOT NULL UNIQUE,
        settings TEXT NOT NULL
      )
    `);

    // Insert initial data if table is empty
    const count = db.prepare('SELECT COUNT(*) as count FROM debug_options').get();
    console.log(`Current debug options count: ${count.count}`);
    
    if (count.count === 0) {
      const insert = db.prepare('INSERT OR IGNORE INTO debug_options (value, settings) VALUES (?, ?)');
      insert.run('boarders', 'true');
      console.log('Database initialized with initial data: boarders = true');
    } else {
      console.log('Database already has data, skipping initialization');
    }
    
    // Verify the data
    const options = db.prepare('SELECT * FROM debug_options').all();
    console.log('Current debug options:', options);
    
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Get all debug options
export function getDebugOptions() {
  try {
    const stmt = db.prepare('SELECT * FROM debug_options');
    const results = stmt.all();
    console.log('Retrieved debug options:', results);
    return results;
  } catch (error) {
    console.error('Error getting debug options:', error);
    return [];
  }
}

// Get specific debug option by value
export function getDebugOption(value) {
  try {
    const stmt = db.prepare('SELECT * FROM debug_options WHERE value = ?');
    const result = stmt.get(value);
    console.log(`Retrieved debug option for ${value}:`, result);
    return result;
  } catch (error) {
    console.error('Error getting debug option:', error);
    return null;
  }
}

// Update debug option
export function updateDebugOption(value, settings) {
  try {
    console.log(`Updating debug option: ${value} = ${settings}`);
    
    // Use INSERT OR REPLACE to handle both insert and update
    const stmt = db.prepare('INSERT OR REPLACE INTO debug_options (value, settings) VALUES (?, ?)');
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

// Close database connection
export function closeDatabase() {
  if (db) {
    db.close();
    console.log('Database connection closed');
  }
}

export default db; 