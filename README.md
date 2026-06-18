# 🩸밀당 - Frontend
임신성 당뇨 산모를 위한 YOLO 활용한 식단 자동 기록 및 RAG 기반 식단 코칭 서비스 **밀당의 프론트엔 리포지토리**입니다. 본 프로젝트는 React Native 및 Expo 프레임워크를 기반으로 개발되었으며, 산모가 마주하는 번거로운 식단 기록 피로도를 낮추고 안전한 대사 관리를 돕기 위해 설계되었습니다. 사용자 경험(UX)을 고려한 직관적인 모바일 UI/UX 인터페이스를 통해 시스템의 핵심 기능을 안정적으로 구동합니다.

## 📑 프로젝트 개요
**밀당**은 매 끼니마다 엄격한 식단 통제와 혈당 관리가 필수적이지만, 바쁜 일상 속에서 지속적인 케어에 어려움을 겪는 임신성 당뇨 산모를 위한 AI 기반 지능형 헬스케어 서비스입니다. 산모가 태아의 건강을 지키면서도 스트레스 없는 적절한 혈당관리를 위해 다음과 같은 핵심 기능을 제공합니다.
* 📸 **YOLOv8 기반** 비전 엔진을 통해 사진 한 장으로 **식단 영양소 자동 기록** 및 매핑

* 📈 **LightGBM 기반** 대사 시뮬레이션을 통해 식후 2시간 **혈당 상승폭 사전 예측** 및 경고

* 🥗 RAG 및 벡터 DB 기술을 기반으로 산모별 혈당 스파이크 방지 **맞춤형 식단 큐레이션**

* 🗺️ 카카오맵 및 식약처 API 연동을 통한 사용자 주변 임신성 당뇨 친화적 **안전 외식 가이드 점수 제공**

* 💬 LLM 및 RAG 기반 가이드라인 검색을 활용한 **임신성 당뇨 전용 1:1 FAQ 맞춤 코칭 챗봇**

## 📑 오픈 소스 프레임워크
본 프로젝트는 React Native 및 Expo 프레임워크를 기반으로 개발되었습니다.
* **Expo SDK**: v51.0.0

* **React Native**: v0.74.x

* **TypeScript**: v5.0.0

* **Expo 공식 사이트**: [expo.dev](https://expo.dev/)

## 📑 사용한 오픈소스 라이브러리

| 패키지명 | 버전 | 설명 | 링크 |
| :--- | :---: | :--- | :--- |
| **expo-router** | ^3.5.0 | 파일 시스템 기반의 네이티브 화면 내비게이션 및 라우팅 지원 | [링크](https://www.npmjs.com/package/expo-router) |
| **react-native-svg** | ^15.0.0 | 벡터 그래픽 및 맞춤형 인포그래픽 UI 렌더링 지원 | [링크](https://www.npmjs.com/package/react-native-svg) |
| **expo-image-picker** | ^15.0.0 | 식단 사진 인식 검증을 위한 모바일 시스템 갤러리/카메라 접근 인터페이스 | [링크](https://www.npmjs.com/package/expo-image-picker) |
| **react-native-gifted-chat** | ^2.4.0 | RAG 기반 식단 코칭 챗봇 인터페이스 구현용 대화창 위젯 | [링크](https://www.npmjs.com/package/react-native-gifted-chat) |
| **@react-native-async-storage/async-storage** | ^1.23.0 | 기저 혈당값 및 유저 세션 상태 저장을 위한 암호화 로컬 스토리지 | [링](https://www.npmjs.com/package/@react-native-async-storage/async-storage) |
> ✅ 위 라이브러리들은 모두 [npmjs.com](https://www.npmjs.com/)에서 공개된 검증된 오픈소스 패키지이며, `package.json` 가이드라인 기준 최신 안정 버전을 명시했습니다.

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

## 🚀 설치 및 실행 방법
프로젝트를 클론하여 **로컬에서 앱을 설치하고 실행할 수 있도록** 단계별로 안내합니다.
설치와 실행 두 단계로 나누어 설명합니다.

### 1️⃣ 설치 방법
**1. 실행 환경 확인**

클론을 진행하기 전, PC에 아래 버전의 환경이 셋업되어 있어야 합니다.
* Node.js v20.20.0 (LTS)
* npm
> 💡환경이 설치되어 있지 않다면 [설치하기](https://nodejs.org/)를 참고하세요.
> ```bash
> node -v   # Node.js 버전 확인
> npm -v    # npm 버전 확인
> ```

**2. 저장소 클론**

명령 프롬프트(cmd) 또는 터미널 앱을 실행한 후, 아래 명령어를 입력하여 소스코드를 내 컴퓨터에 복사하고 해당 디렉토리로 이동합니다.
```bash
git clone https://github.com/TEAM-N0VA/FE.git
cd FE
```
**3. 의존성 라이브러리 설치**

프로젝트 루트 디렉토리 내부에서 아래 **npm 명령어**를 실행하여 package.json에 정의된 외부 오픈소스 프레임워크 패키지들을 로컬 환경에 일괄 다운로드합니다.
```bash
npm install
```
**4. 환경 변수 파일 생성**

계속하여 명령 프롬프트에서 하단의 명령어를 입력하고 .env 파일 내에서 **실제 API 서버 주소**를 입력합니다.
```bash
cp .env.example .env

BASE_URL=https://[실제 API 서버주소]
```
> 정확한 BASE_URL 값은 관리자에게 문의해주세요.
> 
> 문의 메일: yerinkang@ewha.ac.kr

  
### 2️⃣ 빌드 및 실행 방법
로컬 컴퓨터와 테스트용 스마트폰 기기 혹은 에뮬레이터를 준비한 뒤, 터미널에 아래 명령어를 주입하여 Expo 메트로 번들러 개발 서버를 구동합니다.
```bash
npx expo start
```
* **실제 기기 테스트(Android/iOS):** 스마트폰에 'Expo Go' 애플리케이션을 다운로드한 후, 터미널 화면이나 브라우저에 출력된 QR 코드를 카메라로 스캔하면 실시간 연동 빌드가 완료되어 테스트를 진행할 수 있습니다.
* **에뮬레이터 테스트:** 가상 디바이스가 켜진 상태에서 터미널 창에 a (Android Emulator) 또는 i (iOS Simulator) 키를 입력하여 가상 환경 런타임 상에서 모의 테스트를 수행합니다.


## 🌿 브랜치 전략
* main: 배포용
* develop: 개발 통합
* feature/기능명: 기능 개발
