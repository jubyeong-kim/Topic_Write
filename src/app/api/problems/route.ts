import { NextResponse } from 'next/server';
import { mockProblems } from '@/data/mockData';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  // Supabase가 설정되어 있으면 DB에서 조회
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('type_number', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }

  // Supabase가 없으면 목업 데이터 반환
  return NextResponse.json(mockProblems);
}
