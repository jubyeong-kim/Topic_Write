# TOPIK Write

TOPIK II 쓰기 시험 연습 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: Next.js 16 (Turbopack), Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Deploy**: Vercel

## 시작하기

```bash
npm install
npm run dev
```

환경 변수 (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Vercel 배포

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jubyeong-kim/Topic_Write)

1. 위 버튼을 클릭하거나 https://vercel.com/new 에 접속
2. `jubyeong-kim/Topic_Write` 레포지토리 임포트
3. 환경 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy** 클릭
