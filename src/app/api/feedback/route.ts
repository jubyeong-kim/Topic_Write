import { NextResponse } from 'next/server';
import { generateMockFeedback, GrammarRuleInput, mockProblems } from '@/data/mockData';
import { Problem } from '@/types';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { answerId, content, type = 'essay', problemId } = body;

  // Supabase에서 문법 규칙 로드
  let grammarRules: GrammarRuleInput[] = [];
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('grammar_rules')
      .select('*')
      .eq('is_active', true);
    if (data) {
      grammarRules = data as GrammarRuleInput[];
    }
  }

  // 문제 정보 로드 (51/52번 정답 비교용)
  let problem: Problem | undefined;
  if (problemId) {
    // 먼저 Supabase에서 시도
    if (isSupabaseConfigured()) {
      const supabase = getSupabase();
      const { data } = await supabase
        .from('problems')
        .select('*')
        .eq('id', problemId)
        .single();
      if (data) {
        problem = data as Problem;
      }
    }
    // Supabase에서 못 찾았거나 accepted_answers가 없으면 목업에서 보완
    if (!problem || !problem.accepted_answers) {
      const mockProblem = mockProblems.find(p => p.id === problemId);
      if (mockProblem) {
        if (!problem) {
          problem = mockProblem;
        } else {
          // Supabase 데이터에 목업의 accepted_answers 합치기
          problem = { ...problem, accepted_answers: mockProblem.accepted_answers };
        }
      }
    }
  }

  // 규칙 기반 피드백 생성
  const feedback = generateMockFeedback(content, type, grammarRules, problem);

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
