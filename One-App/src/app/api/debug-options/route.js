import { initDatabase, getDebugOptions } from '../../../lib/database';

export async function GET() {
  try {
    initDatabase();
    const options = getDebugOptions();
    
    return Response.json({ success: true, data: options });
  } catch (error) {
    console.error('Error fetching debug options:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
