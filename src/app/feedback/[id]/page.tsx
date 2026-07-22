'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import FeedbackView from '@/components/FeedbackView';
import { FeedbackResult } from '@/types';

export default function FeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const answerId = params.id as string;
  const content = searchParams.get('content') || '';

  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (content) {
      generateFeedback();
    }
  }, [content]);

  const generateFeedback = async () => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answerId,
          content,
        }),
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
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="text-gray-500 hover:text-gray-700"
            >
              ← 뒤로
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">📝 피드백 결과</h1>
              <p className="text-sm text-gray-500">답변에 대한 분석 결과입니다</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">피드백을 분석하는 중...</p>
          </div>
        ) : feedback ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <FeedbackView feedback={feedback} originalContent={content} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">피드백을 불러올 수 없습니다.</p>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            메인으로 돌아가기
          </button>
          <button
            onClick={() => router.back()}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            다시 풀기
          </button>
        </div>
      </main>
    </div>
  );
}
