import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORIES = ['전체', '한식', '중식', '양식', '샐러드'];
const DISTANCES = ['300m', '500m', '1km'];

const MAP_CENTER = { lat: 37.5665, lng: 126.9780 };
const MAP_PINS = [
  { name: '본죽', color: '#27AE60', top: 55, left: 47 },
  { name: '샐러디', color: '#E6AC00', top: 55, left: 200 },
  { name: '서브웨이', color: '#27AE60', top: 135, left: 120 },
  { name: '한솥도시락', color: '#E74C3C', top: 152, left: 274 },
];

const CARD_IMAGE = 'https://api.builder.io/api/v1/image/assets/TEMP/b59729e270da06b3c95720a03b878d39937bb618?width=150';
const MAP_IMAGE = require('@/assets/images/map.png');
const IMG_HAN_SOT = require('@/assets/images/hansot.webp');
const IMG_SUBWAY = require('@/assets/images/subway.png');

const RESTAURANTS = [
  { id: '1', name: '한솥도시락', meta: '150m · 한식 · 저GI', score: 34, scoreColor: '#E74C3C', image: IMG_HAN_SOT },
  { id: '2', name: '서브웨이', meta: '150m · 한식 · 저GI', score: 87, scoreColor: '#27AE60', image: IMG_SUBWAY },
  { id: '3', name: '본죽', meta: '200m · 한식', score: 72, scoreColor: '#27AE60' },
  { id: '4', name: '샐러디', meta: '310m · 샐러드 · 저GI', score: 85, scoreColor: '#27AE60' },
];

export default function RestaurantScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeDistance, setActiveDistance] = useState('300m');
  
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoading(false);
    }, 1200); // 1.2초 대기 (원하는 시간에 따라 숫자 변경 가능)

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>내 주변 안심식당</Text>
        <Text style={styles.subtitle}>임신 28주 · 공복혈당 95 기준</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Map */}
        <View style={styles.mapWrapper}>
          <Image 
            source={MAP_IMAGE} 
            style={styles.map} 
            resizeMode="cover"
          />
          {MAP_PINS.map((pin) => (
            <View key={pin.name} style={[styles.pin, { top: pin.top, left: pin.left }]}>
              <View style={[styles.pinDot, { backgroundColor: pin.color }]} />
              <View style={styles.pinLabel}>
                <Text style={styles.pinText}>{pin.name}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Category filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
          contentContainerStyle={styles.filterContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, activeCategory === cat ? styles.chipActive : styles.chipInactive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.chipText, activeCategory === cat ? styles.chipTextActive : styles.chipTextInactive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Distance + sort */}
        <View style={styles.distanceRow}>
          <View style={styles.distanceChips}>
            {DISTANCES.map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.chip,
                  activeDistance === d ? styles.distanceChipActive : styles.chipInactive,
                ]}
                onPress={() => setActiveDistance(d)}
              >
                <Text
                  style={[
                    styles.chipText,
                    activeDistance === d ? styles.distanceChipTextActive : styles.chipTextInactive,
                  ]}
                >
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>거리순  ▾</Text>
          </TouchableOpacity>
        </View>

        {/* Restaurant cards */}
        {RESTAURANTS.map((r) => (
          <TouchableOpacity 
            key={r.id} 
            style={styles.card} 
            activeOpacity={0.85}
            onPress={() => {
              if (r.name === '샐러디') {
                router.push('/(tabs)/restaurant/detail');
              }
            }}
            >
            <Image source={{ uri: CARD_IMAGE }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardName}>{r.name}</Text>
              <Text style={styles.cardMeta}>{r.meta}</Text>
              <View style={styles.scoreRow}>
                <Text style={[styles.scoreText, { color: r.scoreColor }]}>{r.score}</Text>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${r.score}%` as any, backgroundColor: r.scoreColor },
                    ]}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.cardChevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={{ height: 24 }} />
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    marginTop: 4,
  },
  scroll: {
    paddingHorizontal: 16,
  },
  mapWrapper: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#e8e8e8',
    marginBottom: 16,
  },
  map: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  pin: {
    position: 'absolute',
    alignItems: 'center',
    gap: 4,
  },
  pinDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  pinLabel: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  pinText: {
    fontSize: 8,
    fontWeight: '500',
    color: '#2E292B',
  },
  filterRow: {
    marginBottom: 10,
  },
  filterContent: {
    gap: 10,
    paddingVertical: 2,
  },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 15,
  },
  chipActive: {
    backgroundColor: '#926897',
  },
  chipInactive: {
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    borderColor: '#C8C1C4',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 12,
  },
  chipTextActive: {
    color: '#FFF',
  },
  chipTextInactive: {
    color: '#494145',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  distanceChips: {
    flexDirection: 'row',
    gap: 10,
  },
  distanceChipActive: {
    backgroundColor: '#FDE5F2',
    borderWidth: 2,
    borderColor: '#E2B7CE',
  },
  distanceChipTextActive: {
    color: '#926897',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sortText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#494145',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#1B1B4D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 22,
    elevation: 2,
    gap: 12,
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#101010',
    lineHeight: 21,
  },
  cardMeta: {
    fontSize: 12,
    fontWeight: '400',
    color: '#939393',
    lineHeight: 18,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    width: 28,
  },
  progressTrack: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0DCDE',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  cardChevron: {
    fontSize: 22,
    color: '#101010',
    lineHeight: 26,
  },
});
