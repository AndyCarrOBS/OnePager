import { initDatabase, updateDebugOption } from '../../../../lib/database';

export async function POST(request) {
  try {
    const { value, settings } = await request.json();
    
    if (!value || settings === undefined) {
      return Response.json({ success: false, error: 'Missing value or settings' }, { status: 400 });
    }
    
    initDatabase();
    const result = updateDebugOption(value, settings);
    
    return Response.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating debug option:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
