'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HistoryAnswer {
  id: string;
  problem_id: string;
  content: string;
  score: number;
  is_mock_data: boolean;
  created_at: string;
  problems: {
    id: string;
    type: string;
    type_number: number;
    points: number;
  } | null;
}

export default function HistoryPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<HistoryAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      const res = await fetch('/api/answers');
      const data = await res.json();
      setAnswers(data);
    } catch (e) {
      console.error('Failed to fetch answers:', e);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (typeNumber: number) => {
    const labels: Record<number, string> = { 51: '실용문', 52: '설명문', 53: '자료 설명', 54: '논설문' };
    return labels[typeNumber] || '기타';
  };

  const getTypeColor = (typeNumber: number) => {
    const colors: Record<number, string> = {
      51: 'bg-blue-100 text-blue-700', 52: 'bg-green-100 text-green-700',
      53: 'bg-orange-100 text-orange-700', 54: 'bg-purple-100 text-purple-700',
    };
    return colors[typeNumber] || 'bg-gray-100 text-gray-700';
  };

  const getScoreColor = (score: number | null | undefined) => {
    if (score == null) return 'text-gray-400';
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const truncate = (text: string, max: number) => {
    return text.length > max ? text.substring(0, max) + '...' : text;
  };

  const filtered = filter === 'all' ? answers : answers.filter(a => a.problems?.type_number === parseInt(filter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-700 text-xl">&larr;</button>
              <h1 className="text-xl font-bold text-gray-800">📋 내 답변 기록</h1>
            </div>
            <span className="text-sm text-gray-500">총 {answers.length}개</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* 필터 */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', '51', '52', '53', '54'].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f === 'all' ? '전체' : `${f}번`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">불러오는 중...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-gray-500">아직 작성한 답변이 없습니다.</p>
            <button onClick={() => router.push('/')} className="mt-4 text-blue-500 hover:underline">
              문제 풀러 가기
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {filtered.map((answer) => (
              <div key={answer.id} onClick={() => router.push(`/feedback/${answer.id}`)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 cursor-pointer border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {answer.problems && (
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getTypeColor(answer.problems.type_number)}`}>
                        {answer.problems.type_number}번 {getTypeLabel(answer.problems.type_number)}
                      </span>
                    )}
                    {answer.is_mock_data && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">예시</span>
                    )}
                  </div>
                  <span className={`text-lg font-bold ${getScoreColor(answer.score)}`}>
                    {answer.score != null ? `${answer.score}점` : '미채점'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
                  {truncate(answer.content, 120)}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{formatDate(answer.created_at)}</span>
                  <span className="text-blue-500 font-medium">결과 보기 &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
