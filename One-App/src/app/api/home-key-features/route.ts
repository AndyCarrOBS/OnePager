import { NextResponse } from 'next/server';
import { initDatabase, getHomeKeyFeatures } from '@/lib/database';

export async function GET() {
  try {
    console.log('Home key features API called');
    
    // Initialize database (this should create tables if they don't exist)
    initDatabase();
    console.log('Database initialized');
    
    // Get home key features content
    console.log('Calling getHomeKeyFeatures...');
    const content = getHomeKeyFeatures();
    console.log('getHomeKeyFeatures returned:', content);
    console.log('Content type:', typeof content);
    console.log('Content id:', content?.id);
    
    if (content && content.id > 0) {
      console.log('Returning database content');
      // Return database data if found
      return NextResponse.json(content);
    }
    
    console.log('Returning fallback content - content was null or id <= 0');
    // Return fallback data if database is empty or table doesn't exist
    return NextResponse.json({
      id: 0,
      title: 'Key Features',
      subtitle: 'Discover the powerful features that make OORO the ultimate TV platform for MENA',
      feature1_image: '/img/vector-4.svg',
      feature1_title: 'Entertainment Apps',
      feature1_subtitle: 'Youtube , shahid , Watch it and so much more',
      feature1_url: '/entertainment',
      feature2_image: '/img/frame-1618872926.svg',
      feature2_title: 'OORO Cast',
      feature2_subtitle: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
      feature2_url: '/cast',
      feature3_image: '/img/vector-2.svg',
      feature3_title: 'OORO Browser',
      feature3_subtitle: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
      feature3_url: '/browser',
      feature4_image: '/img/vector-4.svg',
      feature4_title: 'OORO Media player',
      feature4_subtitle: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
      feature4_url: '/media-player',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in home-key-features API:', error);
    
    // Return fallback data on error
    return NextResponse.json({
      id: 0,
      title: 'Key Features',
      subtitle: 'Discover the powerful features that make OORO the ultimate TV platform for MENA',
      feature1_image: '/img/vector-4.svg',
      feature1_title: 'Entertainment Apps',
      feature1_subtitle: 'Youtube , shahid , Watch it and so much more',
      feature1_url: '/entertainment',
      feature2_image: '/img/frame-1618872926.svg',
      feature2_title: 'OORO Cast',
      feature2_subtitle: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
      feature2_url: '/cast',
      feature3_image: '/img/vector-2.svg',
      feature3_title: 'OORO Browser',
      feature3_subtitle: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
      feature3_url: '/browser',
      feature4_image: '/img/vector-4.svg',
      feature4_title: 'OORO Media player',
      feature4_subtitle: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
      feature4_url: '/media-player',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
}
