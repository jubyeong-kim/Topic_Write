'use client';

import { useState } from 'react';
import { FeedbackResult, GrammarError } from '@/types';

interface FeedbackViewProps {
  feedback: FeedbackResult;
  originalContent: string;
  sampleAnswer?: string;
}

type HighlightPart = { text: string; isError: boolean; error?: GrammarError };

function highlightErrors(text: string, errors: GrammarError[]): HighlightPart[] {
  if (errors.length === 0) return [{ text, isError: false }];

  const sorted = [...errors].sort((a, b) => a.position.start - b.position.start);
  const parts: HighlightPart[] = [];
  let lastIndex = 0;

  sorted.forEach((err) => {
    if (err.position.start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, err.position.start), isError: false });
    }
    parts.push({ text: text.slice(err.position.start, err.position.end), isError: true, error: err });
    lastIndex = err.position.end;
  });

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isError: false });
  }

  return parts;
}

export default function FeedbackView({ feedback, originalContent, sampleAnswer }: FeedbackViewProps) {
  const [activeTab, setActiveTab] = useState<'auto' | 'grammar' | 'context'>('auto');
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);

  const highlightedParts = highlightErrors(originalContent, feedback.grammarErrors);

  const tabs = [
    { id: 'auto' as const, label: '자동 수정', count: feedback.autoCorrections.length },
    { id: 'grammar' as const, label: '문법 오류', count: feedback.grammarErrors.length },
    { id: 'context' as const, label: '맥락/흐름', count: feedback.contextIssues.length },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* 점수 */}
      <div className={`${getScoreBg(feedback.overallScore)} rounded-xl p-6 text-center`}>
        <div className={`text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
          {feedback.overallScore}점
        </div>
        <div className="text-gray-600 mt-2">전체 점수</div>
      </div>

      {/* 하이라이트 원문 */}
      {feedback.grammarErrors.length > 0 && (
        <div className="bg-white border border-red-200 rounded-xl p-4">
          <h3 className="text-sm font-bold text-red-600 mb-3">
            🔍 오류가 발견된 부분
          </h3>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {highlightedParts.map((part, i) =>
              part.isError ? (
                <span
                  key={i}
                  className="text-red-600 font-bold underline decoration-red-300 cursor-pointer hover:bg-red-50"
                  onClick={() =>
                    setSelectedError(
                      selectedError?.id === part.error?.id ? null : part.error || null
                    )
                  }
                  title="클릭하면 상세 설명을 확인할 수 있습니다"
                >
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2">🔴 빨간색/볼드 = 문법 오류 (클릭 시 설명)</p>
        </div>
      )}

      {/* 선택된 오류 팝업 */}
      {selectedError && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-yellow-800">
              {selectedError.type}
            </span>
            <button
              onClick={() => setSelectedError(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3 text-sm">
            <span className="text-red-500 line-through font-medium">
              {selectedError.original}
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-green-600 font-medium">
              {selectedError.corrected}
            </span>
          </div>
          <div className="bg-white rounded-lg p-3 mb-2">
            <p className="text-sm font-medium text-gray-700 mb-1">📖 설명</p>
            <p className="text-sm text-gray-600">{selectedError.explanation}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-700 mb-1">💡 제안</p>
            <p className="text-sm text-blue-600">{selectedError.suggestion}</p>
          </div>
        </div>
      )}

      {/* 탭 */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              tab.count > 0 ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="min-h-[200px]">
        {activeTab === 'auto' && (
          <div className="space-y-3">
            {feedback.autoCorrections.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-gray-600 font-medium">문법적으로 자연스러운 표현입니다!</p>
              </div>
            ) : (
              feedback.autoCorrections.map((correction, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-red-500 line-through">{correction.original}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-green-600 font-medium">{correction.corrected}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'grammar' && (
          <div className="space-y-3">
            {feedback.grammarErrors.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-gray-600 font-medium">지적할 문법 오류가 없습니다!</p>
              </div>
            ) : (
              feedback.grammarErrors.map((error) => (
                <div
                  key={error.id}
                  className="bg-yellow-50 rounded-lg p-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                  onClick={() => setSelectedError(selectedError?.id === error.id ? null : error)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600 font-medium">{error.type}</span>
                      <span className="text-sm text-gray-500">|</span>
                      <span className="text-red-500 line-through text-sm font-bold">{error.original}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-green-600 font-medium text-sm">{error.corrected}</span>
                    </div>
                    <span className="text-gray-400">
                      {selectedError?.id === error.id ? '▲' : '▼'}
                    </span>
                  </div>
                  {selectedError?.id === error.id && (
                    <div className="mt-3 pt-3 border-t border-yellow-200">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-700 mb-1">📖 문법 설명</div>
                        <p className="text-sm text-gray-600">{error.explanation}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 mt-2">
                        <div className="text-sm font-medium text-blue-700 mb-1">💡 제안</div>
                        <p className="text-sm text-blue-600">{error.suggestion}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'context' && (
          <div className="space-y-3">
            {feedback.contextIssues.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">✅</div>
                <p className="text-gray-600 font-medium">글의 흐름이 자연스럽습니다!</p>
                <p className="text-sm text-gray-400 mt-1">접속사 사용과 문장 전환이 적절합니다.</p>
              </div>
            ) : (
              feedback.contextIssues.map((issue, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 font-medium">
                      {issue.type === 'flow' && '📝 흐름'}
                      {issue.type === 'coherence' && '📝 일관성'}
                      {issue.type === 'transition' && '🔗 연결 표현'}
                      {issue.type === 'length' && '📄 분량'}
                      {issue.type === 'repetition' && '🔄 반복'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                  {issue.suggestion && (
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-blue-600">💡 {issue.suggestion}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 모범답안 */}
      {sampleAnswer && (
        <details className="bg-green-50 rounded-lg" open>
          <summary className="p-4 cursor-pointer text-green-800 font-bold">
            💡 모범답안 보기
          </summary>
          <div className="px-4 pb-4">
            <p className="text-sm text-green-700 whitespace-pre-wrap leading-relaxed">
              {sampleAnswer}
            </p>
          </div>
        </details>
      )}

      {/* 원문 보기 */}
      <details className="bg-gray-50 rounded-lg">
        <summary className="p-4 cursor-pointer text-gray-700 font-medium">
          📄 원문 보기
        </summary>
        <div className="px-4 pb-4">
          <div className="text-gray-600 whitespace-pre-wrap leading-relaxed">
            {highlightedParts.map((part, i) =>
              part.isError ? (
                <span key={i} className="text-red-600 font-bold underline decoration-red-300">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </div>
        </div>
      </details>
    </div>
  );
}
