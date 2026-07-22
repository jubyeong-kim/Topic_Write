import { NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockTestAnswers } from '@/data/mockData';
import { Answer } from '@/types';

// Supabase 미설정 시 사용하는 메모리 저장소 (단건 조회 route에서도 재사용)
export const memoryAnswers: Answer[] = [];

export async function POST(request: Request) {
  const body = await request.json();
  const { problemId, content, isMockData = false } = body;

  const newAnswer: Answer = {
    id: Date.now().toString(),
    problem_id: problemId,
    user_id: 'test-user',
    content,
    is_mock_data: isMockData,
    created_at: new Date().toISOString(),
  };

  // Supabase가 설정되어 있으면 DB에 저장
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('answers')
      .insert({
        problem_id: problemId,
        user_id: 'test-user',
        content,
        is_mock_data: isMockData,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }

  // Supabase가 없으면 메모리에 저장
  memoryAnswers.push(newAnswer);

  return NextResponse.json(newAnswer);
}

export async function GET() {
  // Supabase가 설정되어 있으면 DB에서 조회
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('answers')
      .select('*, problems(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  }

  // Supabase가 없으면 메모리에서 조회
  return NextResponse.json(memoryAnswers);
}

export function getMockTestAnswer(type: string): string {
  const answers = mockTestAnswers[type] || mockTestAnswers['essay'] || [];
  const randomIndex = Math.floor(Math.random() * answers.length);
  return answers[randomIndex];
}
