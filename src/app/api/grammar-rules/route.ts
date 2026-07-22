import { NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export interface GrammarRule {
  id: number;
  category: string;
  pattern: string;
  type: string;
  explanation: string;
  suggestion: string;
  corrected: string | null;
  severity: string;
}

// 캐시: Supabase에서 가져온 규칙을 메모리에 저장
let cachedRules: GrammarRule[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 60 * 1000; // 1분 캐시

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json([]);
  }

  // 캐시 유효하면 캐시 반환
  if (cachedRules && Date.now() - cacheTime < CACHE_TTL) {
    return NextResponse.json(cachedRules);
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('grammar_rules')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });

  if (error) {
    console.error('Supabase grammar_rules error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  cachedRules = data as GrammarRule[];
  cacheTime = Date.now();

  return NextResponse.json(cachedRules);
}
