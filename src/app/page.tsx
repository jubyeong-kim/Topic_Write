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

  const getProblemCount = (type: string, typeNumber: number) => {
    return problems.filter((p) => p.type === type && p.type_number === typeNumber).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇰🇷</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">TOPIK Write</h1>
              <p className="text-sm text-gray-500">한국어 능력시험 쓰기 연습</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">문제를 불러오는 중...</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                ✍️ TOPIK II 쓰기 영역 연습
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                실제 TOPIK II 쓰기 시험과 동일한 형식의 문제를 풀어보세요.
                <br />
                51~52번 빈칸 채우기, 53번 자료 설명, 54번 논설문 총 4문제입니다.
              </p>
              <div className="flex gap-4 mt-4 text-xs">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">51번 10점</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">52번 10점</span>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">53번 30점</span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">54번 50점</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {problemTypes.map((type) => (
                <ProblemCard
                  key={`${type.type}-${type.typeNumber}`}
                  problemType={type}
                  problemCount={getProblemCount(type.type, type.typeNumber)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="text-center py-6 text-gray-400 text-sm">
        TOPIK Write | 한국어 능력시험 쓰기 연습 플랫폼
      </footer>
    </div>
  );
}
