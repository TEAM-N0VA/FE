import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const CARD_IMAGE =
  'https://api.builder.io/api/v1/image/assets/TEMP/b59729e270da06b3c95720a03b878d39937bb618?width=150';

const SAFETY_TAGS = [
  '저GI 식품 위주',
  '탄수화물 42g 이하',
  '임산부 단백질 충족',
  '나트륨 기준 이내',
  '혈당 스파이크 낮음',
];

function ChevronLeftIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.07996"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface Props {
  onBack?: () => void;
}

export default function RestaurantDetailScreen({ onBack }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const score = 85;
  const scoreColor = '#27AE60';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#926897" />

      {/* Purple header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/(tabs)/restaurant')} 
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          activeOpacity={0.7}
        >
          <ChevronLeftIcon />
        </TouchableOpacity>

        <View style={styles.restaurantInfo}>
          <Image source={{ uri: CARD_IMAGE }} style={styles.restaurantImage} />
          <View style={styles.restaurantMeta}>
            <Text style={styles.restaurantName}>샐러디</Text>
            <Text style={styles.restaurantSubMeta}>310m · 샐러드 · 저GI 多</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Score card */}
        <View style={styles.scoreCard}>
          <View style={styles.scoreTopRow}>
            <Text style={[styles.scoreNumber, { color: scoreColor }]}>{score}</Text>
            <Text style={styles.scoreLabel}> / 100 안심 점수</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFilled, { width: `${score}%` as any, backgroundColor: scoreColor }]} />
          </View>
          <Text style={styles.scoreSubtitle}>나와 비슷한 임산부 기준 상위 12%</Text>
        </View>

        {/* Safety grounds */}
        <Text style={styles.sectionTitle}>안전 근거</Text>
        <View style={styles.tagsContainer}>
          {SAFETY_TAGS.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Chatbot button */}
        <TouchableOpacity 
          style={styles.chatbotButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/faq-chat')}
          >
          <Text style={styles.chatbotLabel}>밀당 챗봇에게 바로 물어보기</Text>
          <Text style={styles.chatbotCTA}>이 식당 가도 될까요? →</Text>
        </TouchableOpacity>

        {/* Feedback button */}
        <TouchableOpacity style={styles.feedbackButton} activeOpacity={0.85}>
          <Text style={styles.feedbackText}>방문 후 피드백 남기기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F7',
  },
  header: {
    backgroundColor: '#926897',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  backButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 28,
    color: '#FFF',
    lineHeight: 32,
    fontWeight: '300',
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  restaurantImage: {
    width: 68,
    height: 68,
    borderRadius: 12,
  },
  restaurantMeta: {
    gap: 6,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 21,
  },
  restaurantSubMeta: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  scoreCard: {
    backgroundColor: '#F8F7F7',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    gap: 10,
  },
  scoreTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scoreNumber: {
    fontSize: 40,
    fontWeight: '600',
    lineHeight: 48,
  },
  scoreLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: '#494145',
    marginBottom: 6,
  },
  progressTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0DCDE',
    overflow: 'hidden',
  },
  progressFilled: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 3,
  },
  scoreSubtitle: {
    fontSize: 10,
    fontWeight: '400',
    color: '#494145',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: '#E2B7CE',
    borderRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#494145',
  },
  chatbotButton: {
    backgroundColor: '#E9E1EA',
    borderWidth: 1,
    borderColor: '#926897',
    borderRadius: 12,
    padding: 18,
    gap: 9,
  },
  chatbotLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: '#494145',
  },
  chatbotCTA: {
    fontSize: 18,
    fontWeight: '600',
    color: '#926897',
  },
  feedbackButton: {
    backgroundColor: '#926897',
    borderRadius: 12,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});
