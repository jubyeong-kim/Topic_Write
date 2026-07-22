'use client';

import { useState, useEffect } from 'react';

interface AnswerFormProps {
  problemId: string;
  problemType: string;
  typeNumber: number;
  timeLimit: number;
  onSubmit: (content: string) => void;
  onMockSubmit: (content: string) => void;
}

export default function AnswerForm({
  problemId,
  problemType,
  typeNumber,
  timeLimit,
  onSubmit,
  onMockSubmit,
}: AnswerFormProps) {
  const [content, setContent] = useState('');
  const [gapAnswer, setGapAnswer] = useState('');
  const [gatAnswer, setGatAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const isFillBlank = typeNumber === 51 || typeNumber === 52;

  // 타이머 카운트다운
  useEffect(() => {
    if (!isTimerRunning) return;
    if (timeLeft <= 0) {
      setIsTimerRunning(false);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // 시간 종료 시 알림
  useEffect(() => {
    if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      alert('⏰ 시간이 종료되었습니다!');
    }
  }, [timeLeft]);

  const getCombinedContent = () => {
    if (isFillBlank) {
      return `ㄱ: ${gapAnswer}\nㄴ: ${gatAnswer}`;
    }
    return content;
  };

  const isFormValid = () => {
    if (isFillBlank) {
      return gapAnswer.trim() !== '' || gatAnswer.trim() !== '';
    }
    return content.trim() !== '';
  };

  const handleSubmit = () => {
    const combined = getCombinedContent();
    if (isFormValid()) {
      onSubmit(combined);
    }
  };

  const handleMockSubmit = () => {
    const combined = isFormValid() ? getCombinedContent() : '';
    onMockSubmit(combined);
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
          <span className={`text-2xl font-mono font-bold ${
            timeLeft === 0 ? 'text-red-600' : timeLeft < 60 ? 'text-orange-500' : 'text-gray-700'
          }`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            disabled={timeLeft === 0}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isTimerRunning
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : timeLeft === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isTimerRunning ? '일시정지' : '시작'}
          </button>
          <button
            onClick={() => {
              setTimeLeft(timeLimit * 60);
              setIsTimerRunning(false);
              setContent('');
              setGapAnswer('');
              setGatAnswer('');
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-600 hover:bg-gray-300"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 답변 입력 */}
      {isFillBlank ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">( ㄱ ) 답변</label>
            <input
              type="text"
              value={gapAnswer}
              onChange={(e) => setGapAnswer(e.target.value)}
              disabled={!isTimerRunning}
              placeholder={isTimerRunning ? '( ㄱ ) 에 들어갈 말을 한 문장으로 쓰시오...' : '⏱️ 타이머를 시작한 후에 답변을 작성할 수 있습니다'}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isTimerRunning
                  ? 'border-gray-200 bg-white'
                  : 'border-gray-100 bg-gray-50 text-gray-400'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">( ㄴ ) 답변</label>
            <input
              type="text"
              value={gatAnswer}
              onChange={(e) => setGatAnswer(e.target.value)}
              disabled={!isTimerRunning}
              placeholder={isTimerRunning ? '( ㄴ ) 에 들어갈 말을 한 문장으로 쓰시오...' : '⏱️ 타이머를 시작한 후에 답변을 작성할 수 있습니다'}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                isTimerRunning
                  ? 'border-gray-200 bg-white'
                  : 'border-gray-100 bg-gray-50 text-gray-400'
              }`}
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!isTimerRunning}
            placeholder={isTimerRunning ? '여기에 답변을 작성하세요...' : '⏱️ 타이머를 시작한 후에 답변을 작성할 수 있습니다'}
            className={`w-full h-64 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              isTimerRunning
                ? 'border-gray-200 bg-white'
                : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}
          />
          <div className={`absolute bottom-3 right-3 text-sm ${
            isTimerRunning ? 'text-gray-400' : 'text-gray-300'
          }`}>
            {content.length}자
          </div>
        </div>
      )}

      {/* 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          제출하기
        </button>
        <button
          onClick={handleMockSubmit}
          disabled={!isTimerRunning}
          className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
            isTimerRunning
              ? 'bg-purple-500 text-white hover:bg-purple-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          🎲 임의 답변 제출
        </button>
      </div>
    </div>
  );
}
