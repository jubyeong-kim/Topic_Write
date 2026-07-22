'use client';

import { useState } from 'react';
import { FeedbackResult, GrammarError, ContextIssue } from '@/types';

interface FeedbackViewProps {
  feedback: FeedbackResult;
  originalContent: string;
}

export default function FeedbackView({ feedback, originalContent }: FeedbackViewProps) {
  const [activeTab, setActiveTab] = useState<'auto' | 'grammar' | 'context'>('auto');
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);

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
              <div className="text-center py-8 text-gray-500">
                자동 수정이 필요한 부분이 없습니다.
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
              <div className="text-center py-8 text-gray-500">
                문법 오류가 없습니다.
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
                      <span className="text-red-500 line-through text-sm">{error.original}</span>
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
              <div className="text-center py-8 text-gray-500">
                맥락/흐름 문제가 없습니다.
              </div>
            ) : (
              feedback.contextIssues.map((issue, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-purple-600 font-medium capitalize">
                      {issue.type === 'flow' && '흐름'}
                      {issue.type === 'coherence' && '일관성'}
                      {issue.type === 'transition' && '전환'}
                      {issue.type === 'length' && '분량'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                  {issue.suggestion && (
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-blue-600">{issue.suggestion}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 원문 보기 */}
      <details className="bg-gray-50 rounded-lg">
        <summary className="p-4 cursor-pointer text-gray-700 font-medium">
          📄 원문 보기
        </summary>
        <div className="px-4 pb-4">
          <p className="text-gray-600 whitespace-pre-wrap">{originalContent}</p>
        </div>
      </details>
    </div>
  );
}
