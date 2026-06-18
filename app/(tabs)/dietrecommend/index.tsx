import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MEALS = [
  {
    id: 1,
    name: '닭가슴살 샐러드',
    subtitle: '단백질 위주 · 저GI · 혈당 안정',
    tags: [
      { label: '혈당 안전', bgColor: '#B4EECD', textColor: '#27AE60' },
      { label: '임신 추천', bgColor: '#FFECB2', textColor: '#E6AC00' },
      { label: '단백질 풍부', bgColor: '#B4EECD', textColor: '#27AE60' },
    ],
    rise: '+14',
    calories: 320,
    gi: 32,
    bloodSugar: '109 mg/dL',
    bloodSugarColor: '#27AE60',
    highlighted: true,
  },
  {
    id: 2,
    name: '두부된장찌개',
    subtitle: '균형잡힌 한식 · 중간 GI',
    tags: [
      { label: '혈당 안전', bgColor: '#B4EECD', textColor: '#27AE60' },
      { label: '임신 추천', bgColor: '#FFECB2', textColor: '#E6AC00' },
    ],
    rise: '+24',
    calories: 480,
    gi: 54,
    bloodSugar: '119 mg/dL',
    bloodSugarColor: '#E6AC00',
    highlighted: false,
  },
  {
    id: 3,
    name: '계란찜',
    subtitle: '부드럽고 소화 용이',
    tags: [
      { label: '입덧 완화', bgColor: '#B4EECD', textColor: '#27AE60' },
      { label: '임신 추천', bgColor: '#FFECB2', textColor: '#E6AC00' },
    ],
    rise: '+19',
    calories: 290,
    gi: 28,
    bloodSugar: '114 mg/dL',
    bloodSugarColor: '#E6AC00',
    highlighted: false,
  },
];

export default function FeatureScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>식단추천</Text>
        </View>
      </View>

      <ScrollView
        style={rec.scrollView}
        contentContainerStyle={rec.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MEALS.map((meal) => (
          <View key={meal.id} style={[rec.card, meal.highlighted && rec.cardHighlighted]}>
            <View style={rec.cardHeader}>
              <View style={[rec.numberBadge, meal.highlighted && rec.numberBadgeHighlighted]}>
                <Text style={[rec.numberText, meal.highlighted && rec.numberTextHighlighted]}>
                  {meal.id}
                </Text>
              </View>
              <View style={rec.cardTitleBlock}>
                <Text style={rec.mealName}>{meal.name}</Text>
                <Text style={rec.mealSubtitle}>{meal.subtitle}</Text>
              </View>
            </View>

            <View style={rec.tagsRow}>
              {meal.tags.map((tag) => (
                <View key={tag.label} style={[rec.tag, { backgroundColor: tag.bgColor }]}>
                  <Text style={[rec.tagText, { color: tag.textColor }]}>{tag.label}</Text>
                </View>
              ))}
            </View>

            <View style={rec.statsRow}>
              <View style={rec.statItem}>
                <Text style={rec.statLabel}>예측 상승</Text>
                <Text style={rec.statValue}>{meal.rise}</Text>
              </View>
              <View style={rec.statItem}>
                <Text style={rec.statLabel}>칼로리</Text>
                <Text style={rec.statValue}>{meal.calories}</Text>
              </View>
              <View style={rec.statItem}>
                <Text style={rec.statLabel}>GI 지수</Text>
                <Text style={rec.statValue}>{meal.gi}</Text>
              </View>
            </View>

            <View style={rec.bloodSugarRow}>
              <Text style={rec.bloodSugarLabel}>식후 2h 예측 혈당</Text>
              <Text style={[rec.bloodSugarValue, { color: meal.bloodSugarColor }]}>
                {meal.bloodSugar}
              </Text>
            </View>
          </View>
        ))}

        <View style={rec.feedbackCard}>
          <Text style={rec.feedbackTitle}>추천 결과에 만족하시나요?</Text>
          <View style={rec.feedbackButtons}>
            <TouchableOpacity style={rec.btnGood} activeOpacity={0.8}>
              <Text style={rec.btnGoodText}>👍 좋았어요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={rec.btnBad} activeOpacity={0.8}>
              <Text style={rec.btnBadText}>👎 별로예요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7F7',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: Colors.secondary
  },
  backBtn: {
    padding: 2,
  },
  headerTitleContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.white,
  },
  sub: {
    fontSize: 14,
    color: '#C8C1C4',
  },
});

// Appended styles for the recommendation content area
const rec = StyleSheet.create({
  scrollView: {
    width: '100%',
    marginTop: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
  card: {
    backgroundColor: '#F8F7F7',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0DCDE',
    padding: 16,
    gap: 10,
  },
  cardHighlighted: {
    borderColor: '#926897',
    borderWidth: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  numberBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E9E1EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberBadgeHighlighted: {
    backgroundColor: '#926897',
  },
  numberText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#926897',
  },
  numberTextHighlighted: {
    color: '#F8F7F7',
  },
  cardTitleBlock: {
    flex: 1,
    gap: 3,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E292B',
  },
  mealSubtitle: {
    fontSize: 12,
    color: '#C8C1C4',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#E9E1EA',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#494145',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E292B',
  },
  bloodSugarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E9E1EA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  bloodSugarLabel: {
    fontSize: 13,
    color: '#494145',
  },
  bloodSugarValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedbackCard: {
    backgroundColor: 'rgba(146, 104, 151, 0.15)',
    borderRadius: 12,
    padding: 16,
    gap: 14,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#494145',
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  btnGood: {
    flex: 1,
    backgroundColor: '#926897',
    borderRadius: 16,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnGoodText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F8F7F7',
  },
  btnBad: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0DCDE',
    backgroundColor: '#F8F7F7',
    borderRadius: 16,
    paddingVertical: 11,
    alignItems: 'center',
  },
  btnBadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#494145',
  },
});
