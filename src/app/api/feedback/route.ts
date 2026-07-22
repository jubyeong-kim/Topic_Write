import { NextResponse } from 'next/server';
import { generateMockFeedback } from '@/data/mockData';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { answerId, content, type = 'essay' } = body;

  // 규칙 기반 피드백 생성
  const feedback = generateMockFeedback(content, type);

  // Supabase가 설정되어 있으면 DB에 저장
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('answers')
      .update({
        feedback,
        score: feedback.overallScore,
      })
      .eq('id', answerId);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json(feedback);
}
