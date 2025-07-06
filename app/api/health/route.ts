import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    
    return NextResponse.json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Ping failed:', error);
    return NextResponse.json({ status: "unhealthy", error: 'Failed to ping database' }, { status: 500 });
  }
}