# TOPIK Write

TOPIK II 쓰기(51~54번) 연습 웹앱. 문제를 풀면 규칙 기반으로 문법·스타일을 자동 채점한다.

- 배포: https://topic-write.onrender.com (Render Web Service)
- 레포: https://github.com/jubyeong-kim/Topic_Write
- 기획 문서: `PRD.md` · 회고: `RETROSPECTIVE.md`

## 스택

Next.js 16 (Turbopack) · React 19 · Tailwind 4 · TypeScript · Supabase(PostgreSQL)

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 배포 전 반드시 통과 확인 (타입체크 포함)
```

환경변수는 `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
(없어도 목업 데이터로 동작한다)

## 구조

```
src/app/page.tsx            메인 — 유형별 문제 카드
src/app/problem/            문제 풀이 (타이머 + 답안 입력)
src/app/feedback/[id]/      피드백 결과 (3탭 + 오류 하이라이트)
src/app/history/            답변 기록
src/app/api/                problems / answers / feedback / grammar-rules
src/data/mockData.ts        문제 데이터 + 채점 엔진(generateMockFeedback)
src/lib/supabase.ts         Supabase 클라이언트 (미설정 시 fallback)
```

## ⚠️ 되돌리면 안 되는 결정

**1. 피드백은 URL 쿼리가 아니라 `id` 로 조회한다**
`GET /api/answers/[id]` 로 저장된 본문·피드백·문제를 가져온다.
과거에 답안 본문을 `?content=` 로 넘겼는데, 54번 논설문(600~700자)은 한글 인코딩 때문에
URL 이 6KB 를 넘겨 잘릴 위험이 있었고 피드백도 두 번 계산됐다. 되돌리지 말 것.

**2. `useSearchParams` 는 반드시 `<Suspense>` 로 감싼다**
Next 16 에서 감싸지 않으면 빌드가 실패한다.

**3. Supabase 미설정 시 fallback 을 유지한다**
`isSupabaseConfigured()` 가 false 면 목업/메모리로 동작한다. 로컬 개발과 데모에 필요하다.

## ⚠️ 배포 함정

**`NEXT_PUBLIC_*` 는 런타임이 아니라 빌드 타임에 번들에 박힌다.**
→ Render **Environment 탭에 빌드 전** 등록해야 한다. `.env.local` 에만 있으면 배포본에서 DB 가 안 붙는다.

**빌드 실패 시 먼저 확인할 것**: 에러 라인을 로컬 최신 코드와 대조한다.
로컬 `npm run build` 가 통과하는데 Render 만 실패하면 **옛 커밋을 빌드 중**일 가능성이 높다
→ Render 에서 *Clear build cache & deploy*.

Render 설정: Build `npm install && npm run build` · Start `npm start`
(`vercel.json` 은 Vercel 잔재이며 Render 는 무시한다)

## 알려진 한계 (의도된 것)

- `user_id` 가 `'test-user'` 하드코딩 → 기록이 전역 공유된다. Supabase Auth 도입은 Phase 3.
- 채점은 정규식 규칙 기반이며 AI 가 아니다. AI 연동은 로드맵상 추후 단계.
- TOPIK 기출문제 원문 저작권은 출제 기관에 있다. 상용화 시 자체 문제로 교체 필요.

## 관련 프로젝트

`../topik-ocr-poc` — 손글씨 답안을 촬영해 이 앱의 채점 파이프라인에 넣으려는 OCR PoC.
