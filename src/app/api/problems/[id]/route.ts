import { NextResponse } from 'next/server';
import { mockProblems } from '@/data/mockData';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Supabase가 설정되어 있으면 DB에서 조회
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  }

  // Supabase가 없으면 목업 데이터에서 조회
  const problem = mockProblems.find(p => p.id === id);

  if (!problem) {
    return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
  }

  return NextResponse.json(problem);
}
