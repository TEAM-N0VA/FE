import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function ResultScreen() {
  const router = useRouter();
  const [satisfaction, setSatisfaction] = useState<string | null>(null);

  // 음식 태그 데이터 (any 타입으로 타입스크립트 에러 방지)
  const foodTags: { name: string; top: any; left: any }[] = [
    { name: '계란찜', top: '15%', left: '50%' },
    { name: '장조림', top: '22%', left: '18%' },
    { name: '쌀밥', top: '33%', left: '54%' },
    { name: '불고기', top: '50%', left: '20%' },
    { name: '카레', top: '58%', left: '70%' },
    { name: '파김치', top: '80%', left: '43%' },
  ];

  return (
    <View style={styles.container}>
      {/* 1. 상단 메뉴바 (Primary 배경, 흰색 텍스트) */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M15 18l-6-6 6-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.headerTitle}>인식결과 확인</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView style={{ flex: 1 }} bounces={false}>
        {/* 2. 음식 사진 (390x390 고정 사이즈) */}
        <ImageBackground
          source={require('../../assets/images/foodresult.jpg')}
          style={styles.imageBackground}
        >
          {foodTags.map((tag, index) => (
            <View key={index} style={[styles.tagContainer, { top: tag.top, left: tag.left }]}>
              <Text style={styles.tagText}>{tag.name} 〉</Text>
            </View>
          ))}
        </ImageBackground>

        {/* 3. 하단 화이트 시트 */}
        <View style={styles.whiteSheet}>
          {/* 총열량 섹션 (양 끝 배치 및 크기 조절) */}
          <View style={styles.kcalRow}>
            <Text style={styles.totalLabel}>총열량</Text>
            <Text style={styles.kcalValue}>867kcal</Text>
          </View>

          {/* 탄단지 가로 배치 섹션 */}
          <View style={styles.nutriContainer}>
            <View style={styles.nutriItem}>
              <View style={[styles.nutriBox, { backgroundColor: Colors.carb }]} />
              <Text style={styles.nutriText}>탄수화물 82.9g</Text>
            </View>
            <View style={styles.nutriItem}>
              <View style={[styles.nutriBox, { backgroundColor: Colors.protien }]} />
              <Text style={styles.nutriText}>단백질 41.3g</Text>
            </View>
            <View style={styles.nutriItem}>
              <View style={[styles.nutriBox, { backgroundColor: Colors.fat }]} />
              <Text style={styles.nutriText}>지방 35.2g</Text>
            </View>
          </View>

          {/* 탄단지 비율 바 */}
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: '40%', backgroundColor: Colors.carb }]} >
                <Text style={styles.barLabel}>40%</Text>
            </View>
            <View style={[styles.bar, { width: '22%', backgroundColor: Colors.protien }]} >
                <Text style={styles.barLabel}>22%</Text>
            </View>
            <View style={[styles.bar, { width: '38%', backgroundColor: Colors.fat }]} >
                <Text style={styles.barLabel}>38%</Text>
            </View>
          </View>

          {/* 만족도 조사 카드 (Primary 0.30 배경) */}
          <View style={styles.satisfactionCard}>
            <Text style={styles.cardTitle}>인식결과에 만족하시나요?</Text>
            <View style={styles.cardButtonRow}>
              <TouchableOpacity 
                style={[styles.subButton, satisfaction === 'bad' && styles.activeButton]}
                onPress={() => setSatisfaction('bad')}
              >
                <Text style={styles.subButtonText}> 👎 별로예요</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.subButton, satisfaction === 'good' && styles.activeButton]}
                onPress={() => setSatisfaction('good')}
              >
                <Text style={styles.subButtonText}> 👍 좋았어요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 저장하기 버튼 */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { backgroundColor: '#926897' }, // Primary 컬러 적용
  headerContent: {
    height: 60,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' }, // 흰색 적용
  
  imageBackground: { width: 390, height: 390 }, // 고정 사이즈
  tagContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },

  whiteSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, 
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  kcalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  totalLabel: { fontSize: 20, fontWeight: '700', color: '#926897' }, 
  kcalValue: { fontSize: 32, fontWeight: '800', color: '#494145' },

  nutriContainer: {
    flexDirection: 'row',
    width: 327,
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  nutriItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  nutriBox: { width: 20, height: 20, borderRadius: 4 }, 
  nutriText: { fontSize: 13, color: '#666', fontWeight: '500' },

  barContainer: { 
    alignSelf: 'center', 
    width: 327, 
    height: 30, 
    flexDirection: 'row', 
    borderRadius: 8, 
    overflow: 'hidden',
    marginBottom: 24, 
  },
  bar: { 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 2,    
  },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 20 },
  barLabel: { 
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
   },

  satisfactionCard: {
    backgroundColor: 'rgba(146, 104, 151, 0.3)', 
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 100, // 버튼 공간 확보
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#494145', textAlign: 'center', marginBottom: 16 }, // 글씨 크기 키움
  cardButtonRow: { flexDirection: 'row', gap: 10 },
  subButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center', 
    flexDirection: 'row',
  },
  activeButton: { backgroundColor: '#926897' },
  subButtonText: { fontSize: 14, color: '#494145', fontWeight: '600', textAlign: 'center', marginLeft: 4, includeFontPadding: false,},

  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 34,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#926897',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
});