import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  // 화면 전체 크기
  window: {
    width,
    height,
  },
  
  // 간격 설정 (Figma의 Padding, Gap)
  spacing: {
    screenPadding: 24,    // 화면 좌우 기본 여백 (container 패딩)
    cardPadding: 16,
    contentGap: 16,      // 요소 간 기본 간격 (오토레이아웃 Gap)
    buttonGap: 12,       // 버튼들 사이의 간격
    sectionMargin: 40,   // 큰 덩어리(로고 vs 버튼) 사이의 간격
  },

  // 모서리 곡률
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,           // 주요 버튼이나 카드형 디자인
    round: 100,          // 동그란 버튼
  },

  // 컴포넌트 높이 (Figma의 Fixed Height)
  height: {
    button: 50,
    input: 48,
  }
};