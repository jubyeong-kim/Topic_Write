import { Problem, ProblemType, FeedbackResult } from '@/types';

export const problemTypes: ProblemType[] = [
  {
    type: 'fill_blank',
    typeNumber: 51,
    name: '실용문',
    description: '초대장, 공지, 이메일, 안내문 등 생활문을 읽고 빈칸에 알맞은 문장을 한 문장으로 쓰시오.',
    points: 10,
    icon: '📝',
    color: 'bg-blue-500',
  },
  {
    type: 'fill_blank',
    typeNumber: 52,
    name: '설명문',
    description: '과학, 건강, 환경 등 설명문을 읽고 빈칸에 알맞은 문장을 한 문장으로 쓰시오.',
    points: 10,
    icon: '📝',
    color: 'bg-green-500',
  },
  {
    type: 'data_description',
    typeNumber: 53,
    name: '자료 설명',
    description: '제시된 표나 그래프의 내용을 서술하시오.',
    points: 30,
    wordLimit: '200~300자',
    icon: '📊',
    color: 'bg-orange-500',
  },
  {
    type: 'essay',
    typeNumber: 54,
    name: '논설문',
    description: '제시된 주제에 대해 자신의 생각을 논리적으로 서술하시오.',
    points: 50,
    wordLimit: '600~700자',
    icon: '✍️',
    color: 'bg-purple-500',
  },
];

export const mockProblems: Problem[] = [
  // ==========================================
  // 51번 실용문 (생활문) — 격식체 (~습니다/ㅂ니다)
  // ==========================================
  {
    id: '51-1',
    type: 'fill_blank',
    type_number: 51,
    points: 10,
    prompt:
      '다음을 읽고 ( ㄱ ) 과 ( ㄴ ) 에 들어갈 말을 각각 한 문장으로 쓰시오. (10점)\n\n축제 관련 문의\n지난 주말 "인주시 별빛 축제"에 갔던 외국인입니다. 지금까지 살면서 이렇게 많은 별을 본 적이 없었습니다. 이번 축제에서 별도 보고 공연도 볼 수 있어서 정말 좋았습니다. 혹시 축제가 언제 또 있습니까? 있다면 이런 멋진 경험을 다시 ( ㄱ ). 또한 축제에 대해 더 알고 싶은데, 관련 자료를 얻을 수 있는 방법이 ( ㄴ ).',
    requirements:
      '( ㄱ ) : 외국인이 다시 축제를 경험하고 싶다는 내용을 한 문장으로 쓰시오.\n( ㄴ ) : 축제 관련 자료를 얻는 방법을 한 문장으로 쓰시오.',
    sample_answer:
      '(ㄱ) 하고 싶습니다.\n(ㄴ) 알려주세요.',
    accepted_answers: {
      gap: ['하고 싶습니다', '하고 싶어요', '다시 가고 싶습니다', '체험하고 싶습니다'],
      gat: ['알려주세요', '알려주시겠습니까', '알려줄 수 있습니까', '가르쳐 주세요'],
    },
    difficulty: 2,
    time_limit: 10,
  },
  {
    id: '51-2',
    type: 'fill_blank',
    type_number: 51,
    points: 10,
    prompt:
      '다음을 읽고 ( ㄱ ) 과 ( ㄴ ) 에 들어갈 말을 각각 한 문장으로 쓰시오. (10점)\n\n<호텔 공사 안내>\n\n오늘 9월 5일부터 15일까지 10일간 호텔 주차장 보수 공사가 진행될 예정입니다. 공사 기간 중에는 주차장을 이용할 수 없으니 ( ㄱ ). 인근 공영주차장을 대신 이용하실 수 있으며, 도보로 약 5분 거리에 있습니다. 공사가 원활하게 진행될 수 있도록 ( ㄴ ).',
    requirements:
      '( ㄱ ) : 공사 기간 중 주차 불가에 대한 안내를 한 문장으로 쓰시오.\n( ㄴ ) : 고객의 협조를 요청하는 내용을 한 문장으로 쓰시오.',
    sample_answer:
      '(ㄱ) 양해해 주세요.\n(ㄴ) 협조해 주세요.',
    accepted_answers: {
      gap: ['양해해 주세요', '양해해 주시기 바랍니다', '이용이 불가합니다', '이용할 수 없습니다', '불편을 드려 죄송합니다'],
      gat: ['협조해 주세요', '협조해 주시기 바랍니다', '도와주세요', '협조 부탁드립니다'],
    },
    difficulty: 2,
    time_limit: 10,
  },

  // ==========================================
  // 52번 설명문 — 문어체 (~ㄴ다/다)
  // ==========================================
  {
    id: '52-1',
    type: 'fill_blank',
    type_number: 52,
    points: 10,
    prompt:
      '다음을 읽고 ( ㄱ ) 과 ( ㄴ ) 에 들어갈 말을 각각 한 문장으로 쓰시오. (10점)\n\n식물은 다양한 방법으로 자신을 보호한다. 덩굴성 야자나무는 빈 줄기를 개미에게 집으로 제공한다. 이 나무에 다른 동물이 다가오면 줄기 속에 있던 개미들은 밖으로 나온다. 이때 개미들의 움직임으로 소리가 생긴다. 이 소리는 동물을 깜짝 ( ㄱ ). 결국 놀란 동물은 나뭇잎을 먹지 못하고 달아나 버린다. 식물학자들은 이것이 바로 이 나무가 자신을 보호하는 ( ㄴ ).',
    requirements:
      '( ㄱ ) : 소리가 동물에게 미치는 효과를 한 문장으로 쓰시오.\n( ㄴ ) : 이것이 어떤 것인지 설명하는 문장을 쓰시오.',
    sample_answer:
      '(ㄱ) 놀라게 한다.\n(ㄴ) 방법이라고 한다.',
    accepted_answers: {
      gap: ['놀라게 한다', '놀라게 만든다', '깜짝 놀라게 한다', '겁을 준다'],
      gat: ['방법이라고 한다', '방식이다', '보호 방법이다', '자기 방어술이다'],
    },
    difficulty: 2,
    time_limit: 10,
  },
  {
    id: '52-2',
    type: 'fill_blank',
    type_number: 52,
    points: 10,
    prompt:
      '다음을 읽고 ( ㄱ ) 과 ( ㄴ ) 에 들어갈 말을 각각 한 문장으로 쓰시오. (10점)\n\n우리가 말할 때 듣는 소리와 녹음된 음성에서 듣는 소리와 다르게 느껴진다. 왜냐하면 녹음된 음성에서 들을 때와 말할 때 소리가 귀로 전달되는 방식이 ( ㄱ ). 녹음된 소리는 공기를 통해서만 귀로 전달된다. 그런데 말할 때의 소리는 ( ㄴ ) 머리뼈를 통해서도 전달된다. 이 두 가지 방식을 통해 귀로 전달되는 소리는 주파수와 소리의 두께에 대한 인식에 차이를 만든다.',
    requirements:
      '( ㄱ ) : 소리 전달 방식이 다르다는 이유를 한 문장으로 쓰시오.\n( ㄴ ) : 공기 외에 다른 전달 경로를 설명하는 문장을 쓰시오.',
    sample_answer:
      '(ㄱ) 다르기 때문이다.\n(ㄴ) 공기를 통해서뿐만 아니라.',
    accepted_answers: {
      gap: ['다르기 때문이다', '전달 방식이 다르기 때문이다', '방법이 다르기 때문이다'],
      gat: ['공기를 통해서뿐만 아니라', '공기 외에도', '공기뿐만 아니라', '골격을 통해서도'],
    },
    difficulty: 2,
    time_limit: 10,
  },

  // ==========================================
  // 53번 자료 설명 (표/그래프 서술)
  // ==========================================
  {
    id: '53-1',
    type: 'data_description',
    type_number: 53,
    points: 30,
    prompt:
      '다음은 2020년부터 2023년까지 한국의 온라인 쇼핑 거래액 변화에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오. (30점)\n\n| 연도 | 거래액(조 원) | 전년 대비 증가율 |\n|------|-------------|----------------|\n| 2020 | 156         | 24.3%          |\n| 2021 | 182         | 16.7%          |\n| 2022 | 198         | 8.8%           |\n| 2023 | 210         | 6.1%           |',
    requirements:
      '• 자료에 나타난 주요 특징을 서술하시오.\n• 증가율 변화의 추세를 설명하시오.\n• 적절한 연결 표현을 사용하시오.',
    sample_answer:
      '한국의 온라인 쇼핑 거래액은 2020년 156조 원에서 2023년 210조 원으로 꾸준히 증가하였다. 특히 2020년에는 전년 대비 24.3%의 높은 증가율을 보였는데, 이는 코로나19로 인해 비대면 쇼핑이 크게 확대된 결과로 보인다. 그러나 2021년에는 16.7%, 2022년에는 8.8%, 2023년에는 6.1%로 증가율이 지속적으로 낮아지는 추세를 보이고 있다. 이러한 추세는 온라인 쇼핑 시장이 포화 상태에 근접하고 있음을 시사한다. 따라서 향후 온라인 쇼핑 업체들은 새로운 성장 동력을 모색해야 할 것으로 보인다.',
    difficulty: 3,
    time_limit: 15,
    word_limit: { min: 200, max: 300 },
  },
  {
    id: '53-2',
    type: 'data_description',
    type_number: 53,
    points: 30,
    prompt:
      '다음은 인주시의 인구 변화에 대한 자료이다. 이 내용을 200~300자의 글로 쓰시오. 단, 글의 제목은 쓰지 마시오. (30점)\n\n| 구분 | 2010년 | 2020년 | 변화 |\n|------|--------|--------|------|\n| 총인구 | 50만 명 | 48만 명 | -2만 명 |\n| 20~30대 | 18만 명 | 12만 명 | -6만 명 |\n| 65세 이상 | 7만 명 | 14만 명 | +7만 명 |\n| 1인 가구 비율 | 20% | 38% | +18%p |',
    requirements:
      '• 인구 변화의 주요 특징을 서술하시오.\n• 변화의 원인을 분석하시오.\n• 200~300자로 서술하시오.',
    sample_answer:
      '인주시의 인구는 2010년 50만 명에서 2020년 48만 명으로 2만 명 감소하였다. 가장 두드러진 변화는 연령대별 인구 구성의 변화이다. 20~30대 인구는 18만 명에서 12만 명으로 6만 명 감소한 반면, 65세 이상 고령 인구는 7만 명에서 14만 명으로 2배 증가하였다. 또한 1인 가구 비율은 20%에서 38%로 크게 증가하였다. 이러한 변화는 젊은 인구의 유출과 고령화가 동시에 진행되고 있음을 보여준다. 따라서 인주시는 일자리 창출과 고령자 복지 정책을 동시에 추진해야 할 것으로 보인다.',
    difficulty: 3,
    time_limit: 15,
    word_limit: { min: 200, max: 300 },
  },

  // ==========================================
  // 54번 논설문 (600~700자)
  // ==========================================
  {
    id: '54-1',
    type: 'essay',
    type_number: 54,
    points: 50,
    prompt:
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오. (50점)\n\n오늘날 경제에 대한 관심이 커지면서 아이들에게 생산, 소비, 돈 등 경제 교육을 하는 시기가 빨라지고 있다. 그러나 아이들에게 경제 교육을 하면 물질 중심 가치관을 키울 수 있다는 우려가 나오고 있다.\n\n1. 아이들에게 경제 교육을 하는 것의 장점은 무엇인가?\n2. 아이들에게 경제 교육을 하는 것의 문제점은 무엇인가?\n3. 아이들에게 올바른 경제 교육 방법은 어떤 것들이 있을까?',
    requirements:
      '• 주제에 대한 자신의 생각을 논리적으로 서술하시오.\n• 구체적인 예시를 제시하시오.\n• 600~700자로 서술하시오.',
    sample_answer:
      '요즘은 학교에 들어가기 전 어릴 때부터 아이들에게 다양한 교육을 실시하는 경우가 많다. 특히 경제 교육에 대한 관심이 커지면서 자녀에게 경제 개념을 가르치는 부모가 늘고 있다. 이러한 조기 경제 교육은 긍정적인 면도 있지만 우려되는 부분도 있다.\n\n먼저 경제 교육의 장점은 아이들이 돈의 가치를 일찍 이해할 수 있다는 점이다. 예를 들어 용돈을 관리하면서 저축과 지출의 개념을 배우면, 성장했을 때 합리적인 소비 습관을 가질 수 있다. 또한 기업이나 시장의 작동 원리를 이해함으로써 사회 경제에 대한 관심을 높이는 데도 도움이 된다.\n\n그러나 경제 교육에는 문제점도 있다. 너무 어린 나이에 돈이나 이윤에만 집중하게 되면 물질적 가치관이 형성될 수 있다. 또한 경쟁적인 태도가 강조될 경우 협력적인 성장에 부정적인 영향을 미칠 수 있다. 부모의 압력에 의해 이루어지는 경제 교육은 아이에게 스트레스를 줄 수도 있다.\n\n따라서 올바른 경제 교육을 위해서는 아이의 발달 단계에 맞는 교육이 이루어져야 한다. 놀이를 통한 체험 학습이나 실생활의 예시를 활용하는 것이 효과적이다. 또한 돈뿐 아니라 나눔과 협력의 가치를 함께 가르치는 것이 중요하다. 그래야만 아이들이 건강한 경제관을 형성할 수 있을 것이다.',
    difficulty: 3,
    time_limit: 30,
    word_limit: { min: 600, max: 700 },
  },
  {
    id: '54-2',
    type: 'essay',
    type_number: 54,
    points: 50,
    prompt:
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오. (50점)\n\n학교나 회사에서 다수의 동료와 힘을 합쳐 과제나 프로젝트를 할 때 성공적인 결과를 얻는 경우가 많다. 하지만 그렇지 못한 경우도 있다.\n\n1. 동료와 함께 일을 하는 것은 어떤 점에서 긍정적인가?\n2. 성공적인 결과를 얻는 데 방해가 되는 요인은 무엇인가?\n3. 동료와 일을 할 때 지녀야 할 바람직한 태도는 무엇인가?',
    requirements:
      '• 주제에 대한 자신의 생각을 논리적으로 서술하시오.\n• 구체적인 예시를 제시하시오.\n• 600~700자로 서술하시오.',
    sample_answer:
      '학교나 회사에서 과제나 프로젝트를 할 때 여러 명이 협력하면 좋은 결과를 얻을 수 있다. 하지만 항상 성공적인 결과가 나오는 것은 아니며, 어떤 태도를 가지느냐가 중요한 요인이 된다.\n\n먼저 동료와 함께 일을 하는 긍정적인 점은 각자의 잘하는 분야를 나눌 수 있다는 것이다. 혼자서는 모든 것을 다 해야 하지만 여러 명이서는 역할을 분담할 수 있어 효율적으로 일을 끝낼 수 있다. 또한 서로 도움을 주고받으며 힘들 때 위로가 되기도 한다.\n\n그러나 방해 요인도 존재한다. 자신의 생각만이 맞다고 주장하는 태도가 가장 큰 문제이다. 이러한 태도는 팀원 간의 갈등을 일으키고 일의 진행을 더디게 만든다. 또한 모든 사람이 쉬운 일만 하려는 태도도 성공적인 결과를 방해한다.\n\n따라서 동료와 일을 할 때는 상대방의 의견을 존중하고 경청하는 태도가 필요하다. 자신이 맡은 일은 성실하게 수행하고, 팀 전체의 목표를 먼저 생각하는 마음가짐이 중요하다. 또한 정해진 기한을 지키고 서로 격려하는 분위기를 만드는 것이 바람직하다. 이러한 태도가 모여야 성공적인 결과를 얻을 수 있을 것이다.',
    difficulty: 3,
    time_limit: 30,
    word_limit: { min: 600, max: 700 },
  },
  {
    id: '54-3',
    type: 'essay',
    type_number: 54,
    points: 50,
    prompt:
      '다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰시오. 단, 문제를 그대로 옮겨 쓰지 마시오. (50점)\n\n우리는 살면서 서로의 생각이 달라 갈등을 겪는 경우가 많다. 이러한 갈등은 의사소통이 부족해서 생기는 경우가 대부분이다. 의사소통은 서로의 관계를 유지하고 발전시키는 데 중요한 요인이 된다.\n\n1. 의사소통은 왜 중요한가?\n2. 의사소통이 잘 이루어지지 않는 이유는 무엇인가?\n3. 의사소통을 원활하게 하는 방법은 무엇인가?',
    requirements:
      '• 주제에 대한 자신의 생각을 논리적으로 서술하시오.\n• 구체적인 예시를 제시하시오.\n• 600~700자로 서술하시오.',
    sample_answer:
      '우리는 일상에서 다양한 사람들과 대화를 나누며 살아간다. 이때 의사소통은 상대방의 마음을 이해하고 관계를 유지하는 데 매우 중요한 역할을 한다. 의사소통이 원활하면 갈등을 예방하고 서로 신뢰를 쌓을 수 있기 때문이다.\n\n그러나 의사소통이 잘 이루어지지 않는 경우도 많다. 첫 번째 이유는 자신의 생각만을 주장하고 상대방의 말을 끝까지 듣지 않는 것이다. 두 번째 이유는 감정에 치우쳐 이성적인 대화가 불가능해지는 경우이다. 또한 문화적 차이나 표현의 차이로 인해 오해가 생기기도 한다.\n\n의사소통을 원활하게 하는 방법으로는 먼저 상대방의 말을 끝까지 경청하는 것이 있다. 경청은 상대방에 대한 존중을 보여주는 것이며, 그래야만 진정한 이해가 가능하다. 또한 자신의 생각을 명확하고 간결하게 전달하는 노력이 필요하다. 감정에 휘둘리지 않고 차분하게 대화하는 태도도 중요하다. 마지막으로 상대방의 입장을 먼저 생각해 보는 여유가 필요하다. 이러한 노력이 쌓이면 원활한 의사소통이 가능해질 것이다.',
    difficulty: 3,
    time_limit: 30,
    word_limit: { min: 600, max: 700 },
  },
];

// 중국 화자 테스트용 목업 답변 (실제 오류 포함)
export const mockTestAnswers: Record<string, string[]> = {
  fill_blank: [
    '다시 이런 축제 경험하고 싶습니다. 관련 자료를 알려주시겠습니까?',
    '호텔 주차장을 이용할 수 없습니다. 공사 협조해 주시기 바랍니다.',
  ],
  data_description: [
    '자료에 따르면 해당 수치가 지속적으로 변화하고 있다. 처음에는 큰 폭으로 증가하였으나, 시간을 지나면서 증가율이 점차 낮아지는 추세를 보인다. 이러한 변화는 시장이 성숙 단계에 진입하고 있다는 것을 나타낸다. 따라서 새로운 정책이나 전략이 필요할 것으로 보인다.',
    '제시된 자료를 분석하면 주목할 만한 변화가 나타나고 있다. 초기에는 뚜렷한 증가세를 보였으나, 최근에는 그 폭이 줄어들고 있다. 이러한 현상은 관련 분야 구조적 변화와 관련이 있을 수 있다. 향후 지속적인 모니터링이 필요하다.',
  ],
  essay: [
    '현대 사회에서 협력 중요성 점점 커지고 있다. 혼자서 해결하기 어려운 문제도 여러 사람 함께 하면 풀 수 있는 경우가 많다. 예를 들어 학교 팀 프로젝트 할 때 각자 잘하는 역할을 나누면 효율적으로 결과물을 만들 수 있다. 또한 서로 부족한 부분을 채울 수 있어 성장하는 데도 도움이 된다.\n\n그러나 협력 과정에서 어려움도 발생한다. 가장 큰 문제는 의견 충돌이다. 서로 다른 관점을 가진 사람들이 하나의 결과물을 만들어야 하기 때문에 갈등이 생기기 쉽다. 또한 누군가가 소홀히 하면 다른 팀원들의 부담이 커지게 된다.\n\n이러한 문제를 해결하기 위해서 서로 존중하고 경청하는 태도가 필요하다. 자신만의 주장보다 팀 전체의 목표 생각하는 마음가짐이 중요하다. 또한 맡은 일은 성실하게 수행하고 정해진 기한을 지키는 것이 바람직하다.',
  ],
};

// Supabase grammar_rules 테이블에서 가져온 규칙 타입
export interface GrammarRuleInput {
  id: number;
  category: string;
  pattern: string;
  type: string;
  explanation: string;
  suggestion: string;
  corrected: string | null;
  severity: string;
}

// 내장 기본 규칙 (Supabase 연결 안 될 때 사용)
const BUILTIN_RULES: GrammarRuleInput[] = [
  // 띄어쓰기
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+고싶다', type: '띄어쓰기', explanation: '"V-고 싶다"에서 띄어쓰기가 필요합니다.', suggestion: '"하고 싶다"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+을수있다', type: '띄어쓰기', explanation: '"V-ㄹ 수 있다"에서 띄어쓰기가 필요합니다.', suggestion: '"할 수 있다"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+을수없다', type: '띄어쓰기', explanation: '"V-ㄹ 수 없다"에서 띄어쓰기가 필요합니다.', suggestion: '"할 수 없다"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+고있다', type: '띄어쓰기', explanation: '"V-고 있다"에서 띄어쓰기가 필요합니다.', suggestion: '"보고 있다"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+을것이다', type: '띄어쓰기', explanation: '"V-ㄹ 것이다"에서 띄어쓰기가 필요합니다.', suggestion: '"갈 것이다"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+야된다', type: '띄어쓰기', explanation: '"V-야 되다"에서 띄어쓰기가 필요합니다.', suggestion: '"가야 된다"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+아야한다', type: '띄어쓰기', explanation: '"V-아야 하다"에서 띄어쓰기가 필요합니다.', suggestion: '"먹어야 한다"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  { id: 0, category: '띄어쓰기', pattern: '[가-힣]+부터시작', type: '띄어쓰기', explanation: '"~부터 시작"에서 띄어쓰기가 필요합니다.', suggestion: '"내일부터 시작"처럼 띄어 써주세요.', corrected: null, severity: 'warning' },
  // 직역체
  { id: 0, category: '직역체', pattern: '해결하기\\s+위해서', type: '중국어 직역체', explanation: '"为了解决"의 직역입니다. "해결하려면"이 더 자연스럽습니다.', suggestion: '"해결하려면"으로 바꿔주세요.', corrected: '해결하려면', severity: 'warning' },
  { id: 0, category: '직역체', pattern: '협력 중요성', type: '조사 생략', explanation: '"협력의 중요성"처럼 관형격 조사 "의"가 필요합니다.', suggestion: '"협력의 중요성"으로 고쳐주세요.', corrected: '협력의 중요성', severity: 'warning' },
  { id: 0, category: '직역체', pattern: '사람들\\s+있다', type: '조사 생략', explanation: '"사람들이 있다"에서 주격 조사 "이"가 생략되었습니다.', suggestion: '"사람들이 있다"로 고쳐주세요.', corrected: '사람들이 있다', severity: 'warning' },
  { id: 0, category: '직역체', pattern: '공간\\s+제공한다', type: '조사 생략', explanation: '"공간을 제공한다"에서 목적격 조사 "를"이 누락되었습니다.', suggestion: '"공간을 제공한다"로 고쳐주세요.', corrected: '공간을 제공한다', severity: 'warning' },
  { id: 0, category: '직역체', pattern: '역할\\s+나누', type: '조사 생략', explanation: '"역할을 나누면"에서 목적격 조사 "를"이 누락되었습니다.', suggestion: '"역할을 나누면"으로 고쳐주세요.', corrected: '역할을 나누', severity: 'warning' },
];

// 51/52번 스타일 감지
function detectStyle(text: string): 'formal' | 'written' | 'informal' | 'neutral' {
  const t = text.trim();
  // 격식체: ~니다/습니다/니까/세요
  if (/(니다|습니다|니까|세요)\s*$/.test(t)) return 'formal';
  // 반말 (해체): ~어/아/야/해/줘/봐/래/네/군/구나/걸/래/데
  if (/[가-힣]+(어|아|야|해|줘|봐|래|네|군|구나|걸|래|데)\s*$/.test(t)) return 'informal';
  // 문어체: ~ㄴ다/는다/한다/이다 (격식체 제외)
  if (/(ㄴ다|는다|한다|인다|이다)\s*$/.test(t)) return 'written';
  return 'neutral';
}

function getRequiredStyle(typeNumber: number): { name: string; desc: string; example: string } {
  if (typeNumber === 51) {
    return { name: '격식체', desc: '~습니다/ㅂ니다', example: '하고 싶습니다, 양해해 주십시오' };
  }
  if (typeNumber === 52) {
    return { name: '문어체', desc: '~ㄴ다/다', example: '놀라게 한다, 방법이라고 한다' };
  }
  return { name: '', desc: '', example: '' };
}

function getStyleMismatchFeedback(
  text: string,
  typeNumber: number,
  label: string,
): string | null {
  if (!text) return null;
  const style = detectStyle(text);
  const required = getRequiredStyle(typeNumber);

  if (style === 'informal') {
    return `${label}이(가) 반말로 작성되었습니다. ${typeNumber}번 문제는 ${required.name}(${required.desc})로 작성해야 합니다.`;
  }
  if (typeNumber === 51 && style === 'written') {
    return `${label}이(가) 문어체(~ㄴ다/다)로 작성되었습니다. 51번 문제는 ${required.name}(${required.desc})로 작성해야 합니다. 예: ${required.example}`;
  }
  if (typeNumber === 52 && style === 'formal') {
    return `${label}이(가) 격식체(~습니다/ㅂ니다)로 작성되었습니다. 52번 문제는 ${required.name}(${required.desc})로 작성해야 합니다. 예: ${required.example}`;
  }
  return null;
}

// 51/52번 빈칸 채우기 정답 비교
function checkFillBlankAnswer(
  content: string,
  problem: Problem,
): { gapCorrect: boolean; gatCorrect: boolean; feedback: string; styleIssues: string[] } {
  const accepted = problem.accepted_answers;
  if (!accepted) return { gapCorrect: false, gatCorrect: false, feedback: '', styleIssues: [] };

  let userGap = '';
  let userGat = '';

  // 형식 1: "ㄱ: ... / ㄴ: ..." 또는 "ㄱ. ... / ㄴ. ..." 등
  const gapMatch = content.match(/[ㄱ]\s*[.:：\)]\s*(.+?)(?:\n|$|[ㄴ])/);
  const gatMatch = content.match(/[ㄴ]\s*[.:：\)]\s*(.+?)$/m);

  if (gapMatch && gatMatch) {
    userGap = gapMatch[1].trim();
    userGat = gatMatch[1].trim();
  } else {
    // 형식 2: 마커 없이 문장만 있는 경우 → 문장 분리
    const sentences = content.split(/[.\n]/).map(s => s.trim()).filter(s => s.length > 0);
    if (sentences.length >= 2) {
      userGap = sentences[0];
      userGat = sentences[1];
    } else if (sentences.length === 1) {
      userGap = sentences[0];
    }
  }

  // 스타일 검사
  const styleIssues: string[] = [];
  const gapStyleIssue = getStyleMismatchFeedback(userGap, problem.type_number, '(ㄱ)');
  if (gapStyleIssue) styleIssues.push(gapStyleIssue);
  const gatStyleIssue = getStyleMismatchFeedback(userGat, problem.type_number, '(ㄴ)');
  if (gatStyleIssue) styleIssues.push(gatStyleIssue);

  // 정답 포함 여부 확인
  // - userGap가 accepted 중 하나를 포함하거나
  // - userGap의 70% 이상 글자가 accepted 중 하나에 포함됨
  const gapCorrect = accepted.gap?.some(a => {
    if (userGap.includes(a)) return true; // 완전 일치
    // 내용 키워드 기반 매칭 (70% 이상 일치)
    const userWords = userGap.replace(/[^가-힣\s]/g, '').split(/\s+/).filter(w => w.length >= 2);
    const acceptedWords = a.replace(/[^가-힣\s]/g, '').split(/\s+/).filter(w => w.length >= 2);
    if (userWords.length === 0 || acceptedWords.length === 0) return false;
    const matched = userWords.filter(uw => acceptedWords.some(aw => aw.includes(uw) || uw.includes(aw)));
    return matched.length >= Math.ceil(userWords.length * 0.7);
  }) ?? false;

  const gatCorrect = accepted.gat?.some(a => {
    if (userGat.includes(a)) return true;
    const userWords = userGat.replace(/[^가-힣\s]/g, '').split(/\s+/).filter(w => w.length >= 2);
    const acceptedWords = a.replace(/[^가-힣\s]/g, '').split(/\s+/).filter(w => w.length >= 2);
    if (userWords.length === 0 || acceptedWords.length === 0) return false;
    const matched = userWords.filter(uw => acceptedWords.some(aw => aw.includes(uw) || uw.includes(aw)));
    return matched.length >= Math.ceil(userWords.length * 0.7);
  }) ?? false;

  let feedback = '';
  if (gapCorrect && gatCorrect) {
    feedback = '모범답안과 일치합니다!';
  } else {
    if (!gapCorrect && userGap) {
      feedback += `(ㄱ) "${userGap}" - 내용이 모범답안과 다릅니다.\n`;
      const gapRef = accepted.gap?.slice(0, 3).join(' / ');
      if (gapRef) feedback += `   ↳ 참고: ${gapRef}\n`;
    }
    if (!gatCorrect && userGat) {
      feedback += `(ㄴ) "${userGat}" - 내용이 모범답안과 다릅니다.\n`;
      const gatRef = accepted.gat?.slice(0, 3).join(' / ');
      if (gatRef) feedback += `   ↳ 참고: ${gatRef}`;
    }
  }
  if (gapCorrect && !userGat) {
    feedback = '(ㄱ)은 정답입니다. (ㄴ) 답변을 추가해주세요.';
  } else if (!gapCorrect && gatCorrect) {
    feedback = '(ㄴ)은 정답입니다. (ㄱ) 답변을 확인해주세요.';
  }

  // 스타일 문제가 있고 내용이 정답이면 별도 메시지 추가
  if (styleIssues.length > 0 && gapCorrect && gatCorrect) {
    feedback = '내용은 모범답안과 일치하지만, 스타일을 확인하세요.';
  }

  return { gapCorrect, gatCorrect, feedback, styleIssues };
}

// 중국 화자 오류 패턴 기반 피드백 생성
export function generateMockFeedback(
  content: string,
  type: string,
  externalRules: GrammarRuleInput[] = [],
  problem?: Problem,
): FeedbackResult {
  const feedback: FeedbackResult = {
    autoCorrections: [],
    grammarErrors: [],
    contextIssues: [],
    overallScore: 75,
  };

  // ── 51/52번 빈칸 채우기: 정답 비교 ──
  if (problem && (problem.type_number === 51 || problem.type_number === 52)) {
    const result = checkFillBlankAnswer(content, problem);
    if (result.feedback) {
      feedback.contextIssues.push({
        type: 'flow',
        description: result.feedback,
        suggestion: problem.sample_answer || '',
        affectedText: '',
      });
    }
    // 스타일 이슈 개별 추가
    for (const si of result.styleIssues) {
      feedback.contextIssues.push({
        type: 'coherence',
        description: si,
        suggestion: getRequiredStyle(problem.type_number).desc,
        affectedText: '',
      });
    }
    // 점수 계산 (내용 100점 기준, 스타일 문제당 -25점)
    const contentScore = (result.gapCorrect ? 50 : 0) + (result.gatCorrect ? 50 : 0);
    const styleDeduction = result.styleIssues.length * 25;
    feedback.overallScore = Math.max(0, contentScore - styleDeduction);
    return feedback;
  }

  // Supabase 규칙이 있으면 사용, 없으면 내장 규칙 사용
  const rules = externalRules.length > 0 ? externalRules : BUILTIN_RULES;

  // 규칙별로 패턴 매칭 실행
  rules.forEach((rule) => {
    try {
      const regex = new RegExp(rule.pattern, 'g');
      const match = content.match(regex);
      if (match) {
        const matched = match[0];
        const startIdx = content.indexOf(matched);

        // 이미 처리된 오류인지 확인 (같은 위치)
        const alreadyProcessed = feedback.grammarErrors.some(
          (e) => Math.abs(e.position.start - startIdx) < 3
        );
        if (alreadyProcessed) return;

        // 자동 수정 규칙 (corrected가 있고 severity가 error/warning인 경우)
        if (rule.corrected && rule.severity !== 'info') {
          feedback.autoCorrections.push({
            original: matched,
            corrected: rule.corrected,
            position: { start: startIdx, end: startIdx + matched.length },
          });
        }

        // 문법 오류 목록에 추가 (info는 제외)
        if (rule.severity !== 'info') {
          feedback.grammarErrors.push({
            id: `g${feedback.grammarErrors.length}`,
            original: matched,
            corrected: rule.corrected || matched,
            type: rule.type,
            explanation: rule.explanation,
            suggestion: rule.suggestion,
            position: { start: startIdx, end: startIdx + matched.length },
          });
        }
      }
    } catch {
      // 잘못된 정규식 패턴은 무시
    }
  });

  // ── 맥락/흐름 검사 ──
  if (type === 'essay' && content.length < 400) {
    feedback.contextIssues.push({
      type: 'length',
      description: '논설문 답변이 400자 미만입니다. 충분한 분량으로 답변을 작성해주세요.',
      suggestion: '각 질문에 대해 구체적인 예시와 근거를 추가해보세요.',
      affectedText: '',
    });
  }

  if (type === 'data_description' && content.length < 150) {
    feedback.contextIssues.push({
      type: 'length',
      description: '자료 설명 답변이 150자 미만입니다.',
      suggestion: '자료의 주요 특징과 변화 추세를 더 자세히 서술해주세요.',
      affectedText: '',
    });
  }

  if (content.length > 100) {
    const transitions = ['그러나', '하지만', '그래서', '또한', '예를 들어', '따라서', '반면', '즉', '먼저', '첫째', '둘째'];
    const hasTransition = transitions.some((w) => content.includes(w));
    if (!hasTransition) {
      feedback.contextIssues.push({
        type: 'transition',
        description: '접속사나 전환 표현이 부족합니다.',
        suggestion: '"그러나", "또한", "예를 들어", "첫째/둘째" 등을 사용해 문장 간 연결을 강화하세요.',
        affectedText: '',
      });
    }
  }

  // ── 점수 계산 ──
  const deduction = feedback.grammarErrors.length * 5 + feedback.contextIssues.length * 3;
  feedback.overallScore = Math.max(35, 90 - deduction);

  return feedback;
}

export const CHINESE_SPEAKER_NATIONALITY = 'china';
