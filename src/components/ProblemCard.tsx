'use client';

import Link from 'next/link';
import { ProblemType } from '@/types';

interface ProblemCardProps {
  problemType: ProblemType;
  problemCount: number;
}

export default function ProblemCard({ problemType, problemCount }: ProblemCardProps) {
  return (
    <Link href={`/problem?type=${problemType.type}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full ${problemType.color} flex items-center justify-center text-white text-2xl`}>
            {problemType.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {problemType.typeNumber}번 - {problemType.name}
            </h3>
            <p className="text-sm text-gray-500">{problemCount}개 문제</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {problemType.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400">TOPIK II 쓰기</span>
          <span className="text-blue-500 text-sm font-medium">시작하기 →</span>
        </div>
      </div>
    </Link>
  );
}
