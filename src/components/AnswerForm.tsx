'use client';

import { useState } from 'react';

interface AnswerFormProps {
  problemId: string;
  problemType: string;
  timeLimit: number;
  onSubmit: (content: string) => void;
  onMockSubmit: (content: string) => void;
}

export default function AnswerForm({
  problemId,
  problemType,
  timeLimit,
  onSubmit,
  onMockSubmit,
}: AnswerFormProps) {
  const [content, setContent] = useState('');
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
    }
  };

  const handleMockSubmit = () => {
    onMockSubmit(content || '');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* 타이머 */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⏱️</span>
          <span className="text-2xl font-mono font-bold text-gray-700">
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isTimerRunning
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isTimerRunning ? '일시정지' : '시작'}
          </button>
          <button
            onClick={() => {
              setTimeLeft(timeLimit * 60);
              setIsTimerRunning(false);
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 답변 입력 */}
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="여기에 답변을 작성하세요..."
          className="w-full h-64 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400">
          {content.length}자
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          제출하기
        </button>
        <button
          onClick={handleMockSubmit}
          className="flex-1 bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
        >
          🎲 임의 답변 제출
        </button>
      </div>
    </div>
  );
}
