'use client';

import { useState, useEffect } from 'react';
import ProblemCard from '@/components/ProblemCard';
import { ProblemType, Problem } from '@/types';
import { problemTypes } from '@/data/mockData';

export default function Home() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch('/api/problems');
      const data = await response.json();
      setProblems(data);
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProblemCount = (type: string) => {
    return problems.filter(p => p.type === type).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇰🇷</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TOPIK Write</h1>
              <p className="text-sm text-gray-500">한국어 쓰기 시험 연습</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">문제를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* 안내 문구 */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                ✍️ TOPIK II 쓰기 시험 연습
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                원하는 문제 유형을 선택하여 한국어 쓰기 실력을 향상시켜 보세요.
                <br />
                각 유형별로 다양한 문제가 준비되어 있으며, 즉시 피드백을 받을 수 있습니다.
              </p>
            </div>

            {/* 문제 유형 목록 */}
            <div className="grid gap-4 md:grid-cols-2">
              {problemTypes.map((type) => (
                <ProblemCard
                  key={type.type}
                  problemType={type}
                  problemCount={getProblemCount(type.type)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {/* 푸터 */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        TOPIK Write © 2024 | 한국어 쓰기 시험 연습 플랫폼
      </footer>
    </div>
  );
}
