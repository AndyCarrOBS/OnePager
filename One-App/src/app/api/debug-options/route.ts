import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, getDebugOptions } from '@/lib/database';

export async function GET(): Promise<NextResponse> {
  try {
    initDatabase();
    const options = getDebugOptions();
    
    return NextResponse.json({ 
      success: true, 
      data: options,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching debug options:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}
