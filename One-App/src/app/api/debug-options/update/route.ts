import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, updateDebugOption } from '@/lib/database';

interface UpdateRequest {
  value: string;
  settings: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: UpdateRequest = await request.json();
    const { value, settings } = body;
    
    if (!value || settings === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing value or settings',
          timestamp: new Date().toISOString()
        }, 
        { status: 400 }
      );
    }
    
    initDatabase();
    const result = updateDebugOption(value, settings);
    
    return NextResponse.json({ 
      success: true, 
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating debug option:', error);
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
