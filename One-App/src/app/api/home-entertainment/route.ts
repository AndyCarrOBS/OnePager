import { NextResponse } from 'next/server';
import { initDatabase, getHomeEntertainment } from '@/lib/database';

export async function GET() {
  try {
    console.log('Home entertainment API called');
    
    // Initialize database (this should create tables if they don't exist)
    initDatabase();
    console.log('Database initialized');
    
    // Get home entertainment content
    const content = getHomeEntertainment();
    console.log('Retrieved content:', content);
    
    if (content && content.id > 0) {
      console.log('Returning database content');
      // Return database data if found
      return NextResponse.json(content);
    }
    
    console.log('Returning fallback content');
    // Return fallback data if database is empty or table doesn't exist
    return NextResponse.json({
      id: 0,
      title: 'First TV Platform For MENA',
      subtitle: 'Stream, discover, and enjoy content in Arabic with OORO-powered devices designed for the Middle East and North Africa',
      button_text: 'Explore OORO Devices',
      button_url: '/devices',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in home-entertainment API:', error);
    
    // Return fallback data on error
    return NextResponse.json({
      id: 0,
      title: 'First TV Platform For MENA',
      subtitle: 'Stream, discover, and enjoy content in Arabic with OORO-powered devices designed for the Middle East and North Africa',
      button_text: 'Explore OORO Devices',
      button_url: '/devices',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
}
