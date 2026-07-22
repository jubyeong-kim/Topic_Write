# 회고 — TOPIK Write (2026-07-22)

바이브코딩으로 하루 만에 TOPIK II 쓰기 연습 웹앱을 기획부터 배포까지 완주한 기록.

## 오늘 한 일

- **PRD 작성**: 문제 정의 → 타겟 유저 → MVP 기능 → 화면 구성 → 데이터 스키마까지 문서로 먼저 정리하고, 그 문서를 기준으로 개발.
- **프론트엔드**: 메인 / 문제 풀이 / 피드백 / 히스토리 4개 화면 구현 (Next.js + Tailwind).
- **백엔드/API**: Next.js API Routes로 6개 엔드포인트 (문제·답변·피드백·문법규칙 CRUD 일부).
- **DB**: Supabase(PostgreSQL) 연동 — problems / answers / grammar_rules 3개 테이블. Supabase 미설정 시 목업으로 동작하는 fallback도 구성.
- **배포**: Render Web Service로 실제 접속 가능한 URL 배포 완료.
- **채점 엔진**: 정규식 규칙 기반 문법·스타일(격식체/문어체) 자동 피드백, 51/52번 정답 비교.

## 막혔던 지점과 해결

### 1. Render 빌드 실패 — `Problem` 타입 import 에러
- **증상**: `Module '@/data/mockData' declares 'Problem' locally, but it is not exported.` 로 빌드 실패.
- **원인**: 코드는 이미 고쳐서 GitHub에 푸시까지 돼 있었는데, **Render가 수정 이전 커밋을 빌드**하고 있었음. 로컬 `next build`는 통과. 즉 코드 문제가 아니라 배포 캐시/커밋 문제였음.
- **해결**: Render에서 **Clear build cache & deploy**로 최신 커밋을 다시 빌드.
- **배운 점**: 배포 로그의 에러 라인을 로컬 최신 코드와 대조하면, "코드 버그"인지 "옛 커밋을 빌드 중"인지 바로 구분할 수 있다.

### 2. `NEXT_PUBLIC_*` 환경변수는 빌드 시점에 박힌다
- Supabase URL/KEY가 `NEXT_PUBLIC_` 접두사라 런타임이 아니라 **빌드 타임**에 번들에 들어감.
- 그래서 Render **Environment 탭에 빌드 전에** 값을 넣어둬야 함. 로컬 `.env.local`에만 있으면 배포본에선 DB 연결이 안 된다.

## 다음에 개선할 것 (코드 리뷰에서 나온 것)

- **답변을 URL 쿼리로 넘기지 않기**: 600~700자 논설문은 URL이 6천 자 이상으로 부풀어 잘릴 위험. `GET /api/answers/[id]` 단건 조회를 추가해 저장된 답변·피드백을 `id`로 읽어오면 피드백 중복 계산도 사라진다.
- **서버 라우트에서 헬퍼 import 제거**: `getMockTestAnswer`를 `route.ts`가 아니라 `mockData.ts`로 이동.
- **유저별 데이터 분리**: 지금은 `user_id`가 하드코딩이라 히스토리가 전역 공유됨 → Supabase Auth 도입(Phase 3).
- **실제 AI 기능 붙이기**: 현재 채점은 규칙 기반. 논설문 총평 등 한 곳에 Claude API를 연결하면 루브릭 5번(AI 기능)을 정직하게 충족.

## 소감

PRD를 먼저 쓰고 시작하니 "무엇을 만들지" 흔들림 없이 개발할 수 있었다. 가장 오래 막힌 건 코드가 아니라 배포 환경(캐시·환경변수)이었고, 결국 문제를 좁히는 과정 자체가 가장 큰 배움이었다.
