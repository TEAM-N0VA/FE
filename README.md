# 🩸밀당 - Frontend
밀당 서비스의 프론트엔드 모바일 애플리케이션 리포지토리입니다.

---
## 📁 폴더 구조(수정 필요)
.
├── app/                 # Expo Router 라우팅(화면) 폴더
├── assets/              # 이미지/폰트 등 정적 리소스
├── components/          # 재사용 UI 컴포넌트
├── constants/           # 상수 정의
├── hooks/               # 커스텀 훅
├── lib/                 # 유틸/헬퍼/공통 로직
├── app.json             # Expo 앱 설정
├── app.config.js        # Expo 동적 설정(필요 시)
├── package.json         # 스크립트/의존성
└── tsconfig.json        # TypeScript 설정

---
## 🚀 실행 방법

### 1️⃣ 실행 환경
* Node.js v22.14.0 (LTS 버전 권장)
* npm

### 2️⃣ 저장소 클론
```powershell
git clone https://github.com/TEAM-NOVA/FE.git
cd FE
```

### 3️⃣ 환경 변수 설정
현재 연동된 외부 API가 없으므로 별도의 .env 설정이 필요하지 않습니다.
(추후 LLM API 및 서버 연동 시 .env 설정 가이드 추가 예정)

### 4️⃣ 의존성 설치
```powershell
npm install
```

### 5️⃣ 앱 실행 및 확인
```powershell
npx expo start
```
