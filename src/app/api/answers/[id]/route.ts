import { NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { memoryAnswers } from '../route';

// 단건 답변 조회 — 저장된 본문/피드백/문제(조인)를 id로 반환.
// 피드백 페이지가 본문을 URL로 넘겨 재채점하던 문제를 없애기 위한 엔드포인트.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('answers')
      .select('*, problems(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data) {
      return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  }

  // Supabase 미설정 시 메모리에서 조회
  const answer = memoryAnswers.find((a) => a.id === id);
  if (!answer) {
    return NextResponse.json({ error: 'Answer not found' }, { status: 404 });
  }
  return NextResponse.json(answer);
}
