# TOPIK Write — Product Requirements Document (PRD)

## 1. 서비스 개요

TOPIK Write는 한국어능력시험(TOPIK) II 쓰기 영역을 연습하는 웹 애플리케이션입니다.
중국어권 학습자가 TOPIK 3~4급을 목표로 실전 문제를 풀고 즉각적인 피드백을 받을 수 있도록 설계되었습니다.

## 2. 문제 정의

| 항목 | 내용 |
|------|------|
| **현황** | TOPIK II 쓰기는 자가 채점이 어렵고, 학원/과외 없이 피드백을 받기 어려움 |
| **문제점** | 기존 서비스는 유료이거나, 문제만 있고 피드백이 부족함 |
| **해결 방안** | 무료로 문제를 풀고 규칙 기반 자동 피드백을 제공하는 웹 서비스 |

## 3. 타겟 유저

- **1차**: 중국어권 TOPIK 3~4급 준비생
- **2차**: 모든 한국어 학습자
- **사용자 니즈**: 실전 문제 풀이 → 즉각적인 오류 분석 → 맞춤형 피드백

## 4. 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | Next.js 16 (Turbopack), Tailwind CSS, TypeScript |
| **Backend** | Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **Deploy** | Render (Free Tier) |
| **Version Control** | GitHub |

## 5. 기능 요구사항

### Phase 1 (MVP) — 완료

| 기능 | 설명 | 구현 상태 |
|------|------|----------|
| 메인 페이지 | 문제 유형별 카드 UI (51~54번) | ✅ |
| 문제 풀이 페이지 | 문제 표시 + 답변 입력 + 타이머 | ✅ |
| 51/52번 입력 | ㄱ/ㄴ 별도 입력 필드 (textarea 대체) | ✅ |
| 피드백 페이지 | 3탭 뷰 (자동수정/문법/맥락) + 오류 하이라이트 | ✅ |
| 문법 규칙 엔진 | 정규식 기반 오류 감지 (43개 규칙) | ✅ |
| 스타일 감지 | 반말/격식체/문어체 판별 및 피드백 | ✅ |
| 띄어쓰기 교정 | 중국어권 학습자 대상 19개 패턴 | ✅ |
| Supabase 연동 | 문제/답변/문법규칙 저장 및 조회 | ✅ |

### Phase 2 — 구현 완료

| 기능 | 설명 |
|------|------|
| 히스토리 페이지 | 과거 답변 목록 조회, 점수/문제별 필터 |
| 답변 API 보강 | 문제 정보 조인하여 반환 |
| 반응형 디자인 | 모바일 대응 그리드 레이아웃 |
| 내비게이션 개선 | 메인 ↔ 히스토리 ↔ 피드백 이동 버튼 |

### Phase 3 이후 — 제품 로드맵

목표 흐름은 다음과 같다.

```
사용자 데이터 → AI 맞춤 출제 → 답안 입력 → 자동 채점 → 피드백 → 데이터 축적 → 강의
```

각 단계의 실현 가능성은 **실측·문헌 근거**로 판단했다.
근거: [OCR PoC](../topik-ocr-poc/README.md) · [안현수(2025) 정리](../research/ahn2025-lexical-features.md)

#### 단계별 판단

| 단계 | 실현성 | 기간(1인) | 근거 |
|------|--------|-----------|------|
| **유저별 데이터 축적** | ★★★★★ | 1~2주 | `answers` 테이블에 답안·점수·피드백이 이미 저장됨. `user_id` 하드코딩만 해제 |
| **자동 채점** | ★★★☆☆ | 구현 2~4주 + **검증 4~8주** | 아래 별도 항목 |
| **피드백** | ★★★★★ | 채점에 포함 | 채점의 부산물. LLM 이 강한 영역 |
| **AI 맞춤 출제** | ★★★★☆ | 3~6주 | 추천 로직은 단순. **문제 생성·검수**가 핵심 |
| **강의 제공** | ★★★★★ (개발)<br>★★☆☆☆ (콘텐츠) | 개발 1~2주 | 뷰어는 단순. **콘텐츠 제작이 병목** |

**MVP 2~3개월** (콘텐츠 제외). 단, 아래 채점 검증 기간에 좌우된다.

#### ⚠️ 자동 채점 — 세 갈래와 그 한계

| 경로 | 성능 | 비용 | 성격 |
|------|------|------|------|
| **A. 자질 기반** | 숙달도 3분류 **87.9%** | GPU·API **0원** | 결정적 → **일관성 문제 없음**, 설명 가능 |
| **B. LLM 채점** | 근접일치 95~98%<br>**완전일치 53~68%** | API 과금 | 유연하나 **불안정** |
| **C. 하이브리드** | — | 중간 | 자질로 등급, **LLM 은 피드백 문구만** |

**→ C 를 채택한다.** 자질 기반은 같은 입력에 같은 출력을 내어 일관성 문제가 원천적으로 없고,
LLM 은 우리가 필요한 **설명 생성**에 강하다. 서로의 약점을 정확히 덮는다.

문헌이 지적하는 LLM 채점의 벽:

- **일관성** — 같은 답안에 다른 점수 (고강희·김도국 2026 이 Self-Consistency 로 완화 시도)
- **내용 평가 한계** — 표층(문법·어휘)은 유용하나 내용 평가는 한계 (최지예·허영수 2024)
- **완전일치 53~68%** (최진영 외 2025)
- **중급 구간 취약** — 초↔고급 혼동은 거의 없으나 중급을 양쪽으로 오분류 (안현수 2025)

> 📌 **OCR PoC 와 같은 구조다.**
> OCR: CER 0.037(글자 96%) 이지만 완전일치 32%.
> 채점: 근접일치 95% 이지만 완전일치 53~68%.
> 둘 다 "대체로 맞지만 정확히는 못 맞힌다" → 해법도 같다: **사람 확인을 전제로 설계**한다.

⚠️ **자질 기반의 간극**: 논문이 하는 것은 **숙달도 분류(초/중/고)** 이고,
우리에게 필요한 것은 **점수 채점**(53번 30점 / 54번 50점)이다. 다른 과제다.
점수 라벨이 붙은 데이터가 필요하며, 6분류로 세분화하면 정확도는 반드시 떨어진다.
**87.9% 를 목표치로 그대로 가져오지 않는다.**

#### 답안 입력 방식 — 미결

외국인 학습자의 한국어 입력 부담이 사용률을 좌우한다. 선택지는 셋이다.

| 방식 | 상태 | 비고 |
|------|------|------|
| **타이핑** | 기본 | TOPIK 이 IBT(컴퓨터 기반)로 전환 중이라면 **오히려 실전 대비**가 된다 → 확인 필요 |
| **사진 OCR** | ❌ 검증 결과 부적합 | 완전일치 32%. [OCR PoC](../topik-ocr-poc/README.md) 참조 |
| **태블릿·터치 필기** | 미검증, **유망** | 획 순서·방향 정보가 있어 사진 OCR 보다 인식률이 크게 높다 |

#### 실행 순서

| 순위 | 과제 | 기간 | 이유 |
|------|------|------|------|
| 1 | 로그인 + 유저별 데이터 분리 | 1~2주 | 가장 싸고 모든 기능의 토대 |
| 2 | 자질 추출기 (어휘 난이도 + 형태소) | 1~2주 | 말뭉치 없이도 착수 가능. 기존 답안에 적용해 분포 확인 |
| 3 | 국립국어원 학습자 말뭉치 신청 | 대기 | 라벨 데이터 14,992편 (무료, 신청 필요) |
| 4 | LLM 피드백 생성 (채점 아님) | 2주 | 설명·교정 제안만 담당 |
| 5 | 채점 신뢰도 검증 | 4~8주 | **구현보다 오래 걸린다.** OCR PoC 의 교훈 |
| 6 | 맞춤 출제 | 3~6주 | 축적 데이터가 있어야 의미 있음 |
| 7 | 강의 | 별도 | 개발보다 콘텐츠 문제 |

#### 그 외 기능

| 기능 | 설명 |
|------|------|
| 오답노트 | 틀린 문제만 모아보기 |
| 문제 추가 | 자체 제작 — **기출문제 저작권 리스크 해소** 효과도 있다 |
| 공유 기능 | 결과 이미지/링크 공유 |

## 6. 데이터 스키마

### problems 테이블
```sql
CREATE TABLE problems (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  type_number INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  requirements TEXT,
  sample_answer TEXT,
  accepted_answers JSONB,
  difficulty INTEGER DEFAULT 2,
  time_limit INTEGER DEFAULT 10,
  word_limit JSONB,
  points INTEGER DEFAULT 10
);
```

### answers 테이블
```sql
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id TEXT REFERENCES problems(id),
  user_id TEXT DEFAULT 'test-user',
  content TEXT NOT NULL,
  feedback JSONB,
  score INTEGER,
  is_mock_data BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### grammar_rules 테이블
```sql
CREATE TABLE grammar_rules (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  pattern TEXT NOT NULL,
  type TEXT NOT NULL,
  explanation TEXT,
  suggestion TEXT,
  corrected TEXT,
  severity TEXT DEFAULT 'warning',
  is_active BOOLEAN DEFAULT true
);
```

## 7. API 설계

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | /api/problems | 전체 문제 목록 조회 |
| GET | /api/problems/:id | 단일 문제 조회 |
| POST | /api/answers | 답변 제출 및 저장 |
| GET | /api/answers | 전체 답변 기록 조회 (문제 정보 포함) |
| POST | /api/feedback | 피드백 생성 (규칙 기반 채점) |
| GET | /api/grammar-rules | 문법 규칙 목록 조회 |

## 8. UI/UX 설계

### 페이지 구성

| 페이지 | 라우트 | 설명 |
|--------|--------|------|
| 메인 | / | 문제 유형별 카드 + 내 기록 버튼 |
| 문제 풀이 | /problem | 문제 선택 + 답변 입력 + 타이머 |
| 피드백 | /feedback/:id | 3탭 피드백 + 원문 하이라이트 + 모범답안 |
| 히스토리 | /history | 답변 목록 + 문제별 필터 + 점수 표시 |

### 디자인 컨셉
- **컬러**: Blue/Indigo 그라데이션 배경, 유형별 컬러 (파랑/초록/주황/보라)
- **반응형**: 모바일 1열 → 태블릿/데스크탑 2열 그리드
- **타이머**: 버튼 클릭 시 시작, useEffect 카운트다운
- **하이라이트**: 문법 오류는 빨간색 + 볼드 처리, 클릭 시 설명 팝업

## 9. 배포

- **URL**: https://topic-write.onrender.com
- **플랫폼**: Render (Node Web Service, Free Tier)
- **환경 변수**: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY

## 10. 평가 루브릭 대응

| 평가 문항 | 충족 내용 |
|-----------|----------|
| 1. PRD 작성 및 기획 | 본 문서 |
| 2. 프론트엔드 (2개 이상 화면) | 메인 / 문제풀이 / 피드백 / 히스토리 (4개) |
| 3. 백엔드/API | RESTful API 6개 엔드포인트 |
| 4. DB 연동 | Supabase (problems, answers, grammar_rules) |
| 5. 배포 및 새로운 시도 | Render 배포 완료, 규칙 기반 AI 피드백 엔진, MCP 스킬 활용 |
