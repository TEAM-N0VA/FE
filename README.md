# 🩸밀당 - Frontend
임신성 당뇨 산모를 위한 YOLO 활용한 식단 자동 기록 및 RAG 기반 식단 코칭 서비스 **밀당의 프론트엔 리포지토리**입니다.

## 📁 폴더 구조
```bash
mealdang/
├── app/                 # Expo Router 라우팅(화면) 폴더
├── assets/              # 이미지/폰트 등 정적 리소스
├── components/          # 재사용 UI 컴포넌트
├── constants/           # 색상, 스타일, 상수 정의
├── hooks/               # 커스텀 훅
├── scripts/             # 빌드 및 배포 보조 스크립트
├── app.json             # Expo 앱 설정
├── package.json         # 스크립트/의존성
└── tsconfig.json        # TypeScript 설정
```

## 🚀 실행 방법

### 1️⃣ 실행 환경
* Node.js v20.20.0 (LTS)
* npm

### 2️⃣ 저장소 클론
```bash
git clone https://github.com/TEAM-N0VA/FE.git
cd FE
```

### 3️⃣ 환경 변수 설정
현재 연동된 외부 API가 없으므로 별도의 .env 설정이 필요하지 않습니다.
(추후 LLM API 및 서버 연동 시 .env 설정 가이드 추가 예정)

### 4️⃣ 의존성 설치
```bash
npm install
```

### 5️⃣ 앱 실행 및 확인
```bash
npx expo start
```

## 🌿 브랜치 전략
* main: 배포용
* develop: 개발 통합
* feature/기능명: 기능 개발
