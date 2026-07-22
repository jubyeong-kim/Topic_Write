<div align="center">

# 🇰🇷 TOPIK Write

**한국어능력시험(TOPIK II) 쓰기 영역 연습 웹 애플리케이션**

문제를 풀고 → 규칙 기반 자동 피드백을 받아 → 스스로 교정하는 무료 학습 플랫폼

<br>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![Deploy](https://img.shields.io/badge/Render-Live-46E3B7?logo=render&logoColor=white)](https://topic-write.onrender.com)

### 🔗 [**서비스 바로가기**](https://topic-write.onrender.com)

</div>

---

## 📖 소개

TOPIK II 쓰기는 **자가 채점이 어렵고**, 학원이나 과외 없이는 피드백을 받기 힘듭니다.
기존 서비스는 유료이거나 문제만 제공하고 피드백이 없습니다.

**TOPIK Write** 는 실제 시험과 동일한 형식의 문제를 무료로 풀고,
중국어권 학습자가 자주 틀리는 오류에 특화된 **규칙 기반 자동 피드백**을 즉시 받을 수 있도록 만들었습니다.

- 🎯 **타겟**: TOPIK 3~4급을 준비하는 중국어권 학습자 (그리고 모든 한국어 학습자)
- ✍️ **범위**: 51번(실용문) · 52번(설명문) · 53번(자료 설명) · 54번(논설문)

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 📝 **실전 문제 풀이** | 51~54번 유형별 문제 + 시간 제한 타이머 |
| 🎯 **51/52번 빈칸 채우기** | ( ㄱ ) · ( ㄴ ) 별도 입력, 모범답안과 정답 비교 |
| 🔍 **자동 피드백** | 문법 오류 · 자동 교정 · 맥락/흐름을 3개 탭으로 분석 |
| 🎨 **오류 하이라이트** | 틀린 부분을 빨간색으로 표시, 클릭하면 상세 설명 |
| 🈶 **스타일 감지** | 격식체(~습니다) / 문어체(~ㄴ다) / 반말 판별 후 교정 안내 |
| 📋 **답변 기록** | 과거 답변을 유형·점수별로 모아보기 |

---

## 🖥️ 화면 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 메인 | `/` | 유형별 문제 카드 + 내 기록 |
| 문제 풀이 | `/problem` | 문제 표시 + 답변 입력 + 타이머 |
| 피드백 | `/feedback/:id` | 3탭 피드백 + 오류 하이라이트 + 모범답안 |
| 히스토리 | `/history` | 답변 목록 + 유형 필터 + 점수 |

---

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | Next.js 16 (Turbopack) · React 19 · Tailwind CSS 4 · TypeScript |
| **Backend** | Next.js API Routes |
| **Database** | Supabase (PostgreSQL) |
| **Deploy** | Render (Web Service) |

### API 엔드포인트

```
GET    /api/problems         전체 문제 조회
GET    /api/problems/:id      단일 문제 조회
POST   /api/answers           답변 제출 및 저장
GET    /api/answers           답변 기록 조회
POST   /api/feedback          피드백 생성 (규칙 기반 채점)
GET    /api/grammar-rules     문법 규칙 조회
```

---

## 🚀 시작하기

### 1. 설치 및 실행

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000) 접속

### 2. 환경 변수 (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> 💡 환경 변수가 없어도 목업 데이터로 동작합니다. (DB 연동 시에만 필요)

### 3. 데이터베이스 세팅

Supabase SQL 편집기에서 `supabase-schema.sql` 과 `supabase-grammar-rules.sql` 을 실행하면
테이블과 기본 문법 규칙이 생성됩니다.

---

## ☁️ Render 배포

1. [Render](https://render.com) → **New → Web Service** → GitHub 레포 연결
2. 빌드 설정
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
3. **Environment** 탭에 환경 변수 추가 (⚠️ `NEXT_PUBLIC_*` 는 빌드 시점에 필요하므로 배포 전에 등록)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**

---

## 🗺️ 로드맵

- [ ] **AI 채점 연동** — 규칙 기반 엔진을 더 고도화한 뒤, 논설문 총평 등에 Claude API를 연결할 예정 *(추후 단계)*
- [ ] 회원가입 / 로그인 (Supabase Auth) — 유저별 기록 분리
- [ ] 오답노트 — 틀린 문제만 모아보기

---

<div align="center">

**TOPIK Write** · 한국어능력시험 쓰기 연습 플랫폼

</div>
