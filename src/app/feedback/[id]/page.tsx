'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import FeedbackView from '@/components/FeedbackView';
import { FeedbackResult, Problem } from '@/types';

function FeedbackContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const answerId = params.id as string;
  const content = searchParams.get('content') || '';
  const problemType = searchParams.get('type') || 'essay';
  const problemId = searchParams.get('problemId') || '';

  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (content) {
      generateFeedback();
    }
    if (problemId) {
      fetchProblem();
    }
  }, [content, problemId]);

  const fetchProblem = async () => {
    try {
      const res = await fetch(`/api/problems/${problemId}`);
      const data: Problem = await res.json();
      setProblem(data);
    } catch (e) {
      console.error('Failed to fetch problem:', e);
    }
  };

  const generateFeedback = async () => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answerId, content, type: problemType, problemId }),
      });
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error('Failed to generate feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-700">
              ← 뒤로
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">📝 피드백 결과</h1>
              <p className="text-sm text-gray-500">답변에 대한 분석 결과입니다</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">피드백을 분석하는 중...</p>
          </div>
        ) : feedback ? (
          <>
            {/* 문제 내용 표시 */}
            {problem && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">📋 문제 {problem.id}</h2>
                  <span className="text-sm text-gray-500">{problem.points}점</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                    {problem.prompt}
                  </p>
                </div>
                {problem.requirements && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700 whitespace-pre-wrap">
                      {problem.requirements}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 피드백 결과 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <FeedbackView
                feedback={feedback}
                originalContent={content}
                sampleAnswer={problem?.sample_answer || ''}
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/history')}
                className="sm:flex-1 bg-gray-100 text-gray-600 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
              >
                📋 목록
              </button>
              <button
                onClick={() => router.push('/')}
                className="sm:flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
              >
                메인으로
              </button>
              <button
                onClick={() => router.back()}
                className="sm:flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
              >
                다시 풀기
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">피드백을 불러올 수 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">로딩 중...</p>
          </div>
        </div>
      }
    >
      <FeedbackContent />
    </Suspense>
  );
}
