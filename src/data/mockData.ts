import { Problem, ProblemType, FeedbackResult } from '@/types';

export const problemTypes: ProblemType[] = [
  {
    type: 'essay',
    typeNumber: 54,
    name: '글쓰기',
    description: '제시된 주제에 대해 자신의 생각을 논리적으로 서술합니다.',
    icon: '✍️',
    color: 'bg-blue-500',
  },
  {
    type: 'description',
    typeNumber: 55,
    name: '설명하기',
    description: '제시된 상황이나 대상을 구체적으로 설명합니다.',
    icon: '📋',
    color: 'bg-green-500',
  },
  {
    type: 'story',
    typeNumber: 56,
    name: '이야기하기',
    description: '제시된 상황을 바탕으로 이야기를 구성합니다.',
    icon: '📖',
    color: 'bg-purple-500',
  },
  {
    type: 'opinion',
    typeNumber: 57,
    name: '의견쓰기',
    description: '제시된 문제에 대한 자신의 의견을 제시합니다.',
    icon: '💬',
    color: 'bg-orange-500',
  },
  {
    type: 'debate',
    typeNumber: 58,
    name: '토론하기',
    description: '제시된 주제에 대해 찬반 논거를 제시합니다.',
    icon: '🎭',
    color: 'bg-red-500',
  },
];

export const mockProblems: Problem[] = [
  {
    id: '1',
    type: 'essay',
    type_number: 54,
    prompt: '다음 주제에 대해 800자 이상으로 글을 쓰시오.\n\n"한국 문화가 세계적으로 주목받는 이유"',
    requirements: '• 자신의 생각과 경험을 구체적으로 서술하시오.\n• 논리적인 구조로 글을 구성하시오.\n• 적절한 예시를 제시하시오.',
    sample_answer: '한국 문화가 세계적으로 주목받는 이유에는 여러 가지가 있습니다. 먼저, K-POP과 드라마를 중심으로 한 한류 문화의 영향이 큽니다...',
    difficulty: 2,
    time_limit: 30,
  },
  {
    id: '2',
    type: 'description',
    type_number: 55,
    prompt: '다음 사진을 보고 300자 이상으로 자세히 설명하시오.\n\n[사진: 서울 시내 전경]',
    requirements: '• 사진에 있는 주요 요소들을 설명하시오.\n• 시각적 세부사항을 포함하시오.\n• 논리적인 순서로 설명하시오.',
    difficulty: 2,
    time_limit: 20,
  },
  {
    id: '3',
    type: 'story',
    type_number: 56,
    prompt: '다음 상황을 시작으로 하는 이야기를 400자 이상으로 쓰시오.\n\n"어느 추운 겨울 날, 갑자기 낯선 사람이 찾아왔다..."',
    requirements: '• 인물, 장소, 사건을 포함하시오.\n• 일어난 순서대로 서술하시오.\n• 적절한 결말을 포함하시오.',
    difficulty: 1,
    time_limit: 25,
  },
  {
    id: '4',
    type: 'opinion',
    type_number: 57,
    prompt: '다음 주제에 대한 자신의 의견을 600자 이상으로 쓰시오.\n\n"대학 등록금은 인상되어야 하는가?"',
    requirements: '• 자신의 의견을 명확히 제시하시오.\n• 근거를 구체적으로 제시하시오.\n• 반대 의견도 고려하시오.',
    difficulty: 3,
    time_limit: 30,
  },
  {
    id: '5',
    type: 'debate',
    type_number: 58,
    prompt: '다음 주제에 대해 찬성과 반대 논거를 각각 300자 이상으로 쓰시오.\n\n"인공지능은 인간의 일자리를 대체할 것이다"',
    requirements: '• 찬성 논거를 제시하시오.\n• 반대 논거를 제시하시오.\n• 근거를 구체적으로 제시하시오.',
    difficulty: 3,
    time_limit: 35,
  },
];

export const mockTestAnswers = [
  '저는 한국 문화가 세계적으로 주목받는 이유는 K-POP과 드라마 때문이라고 생각합니다. 한국 음악과 드라마는 아시아뿐만 아니라 전 세계에서 인기를 끌고 있습니다.',
  '한국어를 배우는 것은 재미있지만 어려워요. 특히 조사와 어순이 한국어와 다른 언어와 달라서 헷갈릴 때가 많습니다.',
  '서울은 아주 크고 아름다운 도시입니다. 한강이 도시를 가로지르고 있고, 고층 빌딩과 전통 건물이 공존하고 있습니다.',
  '저는 매일 한국어 공부를 합니다. 아침에 단어를 외우고, 저녁에 듣기 연습을 합니다. 한국 드라마를 보면서 한국어를 배우기도 합니다.',
  '한국 음식 중에서 김치찌개를 가장 좋아해요. 김치찌개는 김치와 돼지고기를 넣고 끓인 음식인데, 매우 맛있어요.',
  '한국은 사계절이 뚜렷해요. 봄에는 벚꽃이 아름답고, 여름에는 축제가 많아요. 가을에는 단풍이 예쁘고, 겨울에는 눈이 와요.',
  '한국 드라마를 자주 보는데 감동적이에요. 특히 로맨틱 코미디 드라마를 좋아합니다. 배우들의 연기도 뛰어나요.',
  '한국 친구들과 대화하는 것이 좋아요. 한국 친구들은 항상 친절하고, 저에게 한국어를 가르쳐줍니다.',
  '저는 한국 여행을 가고 싶어요. 먼저 서울에 가서 경복궁과 북촌한옥마을을 방문하고 싶어요.',
  '한국 문화는 매우 다양해요. 음악, 영화, 음식 등 여러 가지가 있어요. 저는 한국 문화를 좋아합니다.',
];

export function generateMockFeedback(content: string): FeedbackResult {
  const feedback: FeedbackResult = {
    autoCorrections: [],
    grammarErrors: [],
    contextIssues: [],
    overallScore: 75,
  };

  // 자동 수정 규칙
  const autoCorrectionRules: Array<{ pattern: RegExp; corrected: string; original: string }> = [
    { pattern: /갔어요/g, corrected: '갔어요', original: '갔어요' },
    { pattern: /했어요/g, corrected: '했어요', original: '했어요' },
    { pattern: /있어요/g, corrected: '있어요', original: '있어요' },
    { pattern: /좋아합니다/g, corrected: '좋아해요', original: '좋아합니다' },
    { pattern: /배웁니다/g, corrected: '배워요', original: '배웁니다' },
    { pattern: /합니다/g, corrected: '해요', original: '합니다' },
  ];

  autoCorrectionRules.forEach(rule => {
    if (rule.pattern.test(content)) {
      feedback.autoCorrections.push({
        original: rule.original,
        corrected: rule.corrected,
        position: { start: content.indexOf(rule.original), end: content.indexOf(rule.original) + rule.original.length },
      });
    }
  });

  // 문법 오류 검사
  const grammarRules: Array<{
    pattern: RegExp;
    type: string;
    explanation: string;
    suggestion: string;
    corrected: string;
  }> = [
    {
      pattern: /이\s*것/g,
      type: '조사 오류',
      explanation: '"이것"은 "이것"으로 써야 합니다. "이 것"은 잘못된 표기입니다.',
      suggestion: '"이것"으로 바꿔주세요.',
      corrected: '이것',
    },
    {
      pattern: /저는.*좋아합니다/g,
      type: '어조 불일치',
      explanation: '구어체에서는 "-합니다"보다 "-해요"가 더 자연스럽습니다.',
      suggestion: '"좋아해요"로 바꿔주세요.',
      corrected: '좋아해요',
    },
    {
      pattern: /한국어.*배웁니다/g,
      type: '어조 불일치',
      explanation: '구어체에서는 "-ㅂ니다"보다 "-요" 체가 자연스럽습니다.',
      suggestion: '"배워요"로 바꿔주세요.',
      corrected: '배워요',
    },
  ];

  grammarRules.forEach(rule => {
    const match = content.match(rule.pattern);
    if (match) {
      feedback.grammarErrors.push({
        id: `grammar-${feedback.grammarErrors.length}`,
        original: match[0],
        corrected: rule.corrected,
        type: rule.type,
        explanation: rule.explanation,
        suggestion: rule.suggestion,
        position: { start: content.indexOf(match[0]), end: content.indexOf(match[0]) + match[0].length },
      });
    }
  });

  // 맥락/흐름 검사
  if (content.length < 200) {
    feedback.contextIssues.push({
      type: 'length',
      description: '답변이 너무 짧습니다. 더 자세한 설명이 필요합니다.',
      suggestion: '구체적인 예시나 근거를 추가해주세요.',
      affectedText: content.substring(0, 50) + '...',
    });
  }

  const transitionWords = ['그러나', '하지만', '그래서', '또한', '예를 들어', '따라서'];
  const hasTransition = transitionWords.some(word => content.includes(word));
  if (content.length > 150 && !hasTransition) {
    feedback.contextIssues.push({
      type: 'transition',
      description: '접속사나 전환 표현이 부족합니다.',
      suggestion: '"그러나", "하지만", "그래서" 등의 표현을 사용해 문장 간 연결을 강화하세요.',
      affectedText: '',
    });
  }

  // 점수 계산
  const deductionForGrammar = feedback.grammarErrors.length * 5;
  const deductionForLength = content.length < 200 ? 15 : 0;
  feedback.overallScore = Math.max(50, 90 - deductionForGrammar - deductionForLength);

  return feedback;
}

export const languageTranslations: Record<string, string> = {
  ja: '日本語',
  zh: '中文',
  en: 'English',
  vi: 'Tiếng Việt',
  th: 'ภาษาไทย',
  id: 'Bahasa Indonesia',
  other: '기타',
};

export function getTranslation(word: string, nationality: string): string {
  const translations: Record<string, Record<string, string>> = {
    ja: {
      '가족': '家族 (かぞく)',
      '문화': '文化 (ぶんか)',
      '음식': '食り物 (たべもの)',
      '여행': '旅行 (りょこう)',
      '친구': '友達 (ともだち)',
    },
    zh: {
      '가족': '家庭 (jiātíng)',
      '문화': '文化 (wénhuà)',
      '음식': '食物 (shíwù)',
      '여행': '旅行 (lǚxíng)',
      '친구': '朋友 (péngyǒu)',
    },
    en: {
      '가족': 'family',
      '문화': 'culture',
      '음식': 'food',
      '여행': 'travel',
      '친구': 'friend',
    },
  };

  return translations[nationality]?.[word] || word;
}
