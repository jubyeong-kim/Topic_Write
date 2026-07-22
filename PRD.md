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

### Phase 3 — 제안

| 기능 | 설명 |
|------|------|
| 회원가입/로그인 | Supabase Auth 기반 |
| 오답노트 | 틀린 문제만 모아보기 |
| AI 채점 | OpenAI API 연동 (선택) |
| 문제 추가 | 더 다양한 주제의 문제 |
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
