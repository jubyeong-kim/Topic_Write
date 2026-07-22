'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AnswerForm from '@/components/AnswerForm';
import { Problem } from '@/types';
import { getMockTestAnswer } from '@/app/api/answers/route';

function ProblemContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const problemType = searchParams.get('type') || 'essay';

  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, [problemType]);

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems');
      const data = await response.json();
      const filtered = data.filter((p: Problem) => p.type === problemType);
      setProblems(filtered);
      if (filtered.length > 0) {
        setSelectedProblem(filtered[0]);
      }
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (content: string) => {
    if (!selectedProblem || submitting) return;

    setSubmitting(true);
    try {
      const answerResponse = await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: selectedProblem.id,
          content,
          isMockData: false,
        }),
      });
      const answerData = await answerResponse.json();

      const feedbackResponse = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answerId: answerData.id,
          content,
        }),
      });
      await feedbackResponse.json();

      router.push(`/feedback/${answerData.id}?content=${encodeURIComponent(content)}`);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMockSubmit = async (content: string) => {
    if (!selectedProblem || submitting) return;

    setSubmitting(true);
    try {
      const mockContent = content || getMockTestAnswer();

      const answerResponse = await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: selectedProblem.id,
          content: mockContent,
          isMockData: true,
        }),
      });
      const answerData = await answerResponse.json();

      const feedbackResponse = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answerId: answerData.id,
          content: mockContent,
        }),
      });
      await feedbackResponse.json();

      router.push(`/feedback/${answerData.id}?content=${encodeURIComponent(mockContent)}`);
    } catch (error) {
      console.error('Failed to submit mock answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      essay: '글쓰기',
      description: '설명하기',
      story: '이야기하기',
      opinion: '의견쓰기',
      debate: '토론하기',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">문제를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <h1 className="text-xl font-bold text-gray-800">
                {problemType === 'essay' && '✍️'}
                {problemType === 'description' && '📋'}
                {problemType === 'story' && '📖'}
                {problemType === 'opinion' && '💬'}
                {problemType === 'debate' && '🎭'}
                {' '}{getTypeLabel(problemType)}
              </h1>
              <p className="text-sm text-gray-500">
                TOPIK II 쓰기 {problems.length > 0 ? `${problems[0].type_number}번` : ''}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {problems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">해당 유형의 문제가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <h3 className="text-sm font-medium text-gray-700 mb-3">문제 선택</h3>
              <div className="space-y-2">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedProblem?.id === problem.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm">문제 {problem.id}</div>
                    <div className="text-xs opacity-75 mt-1">
                      난이도: {'★'.repeat(problem.difficulty)}{'☆'.repeat(3 - problem.difficulty)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              {selectedProblem && (
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-gray-800">
                        문제 {selectedProblem.id}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>⏱️ {selectedProblem.time_limit}분</span>
                        <span>|</span>
                        <span>난이도: {'★'.repeat(selectedProblem.difficulty)}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedProblem.prompt}
                      </p>
                    </div>
                    {selectedProblem.requirements && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">요구사항</h3>
                        <p className="text-sm text-blue-700 whitespace-pre-wrap">
                          {selectedProblem.requirements}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">답변 작성</h3>
                    <AnswerForm
                      problemId={selectedProblem.id}
                      problemType={selectedProblem.type}
                      timeLimit={selectedProblem.time_limit}
                      onSubmit={handleSubmit}
                      onMockSubmit={handleMockSubmit}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProblemPage() {
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
      <ProblemContent />
    </Suspense>
  );
}
