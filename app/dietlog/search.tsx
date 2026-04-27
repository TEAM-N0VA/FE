import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { G, Mask, Path, Rect } from 'react-native-svg';
import ServingSizeSheet from '../../components/ServingSizeSheet';

/* ── color tokens (not yet in Colors.ts) ── */
const C = {
  secondary: '#926897',
  white: '#F8F7F7',
  gray: '#C8C1C4',
  lightGray: '#E0DCDE',
  textGray: '#494145',
  textMuted: '#988B91',
  text: '#2E292B',
  badgeBg: '#DEE8F8',
  badgeText: '#275FAE',
  shadow: 'rgba(0,0,0,0.25)',
};

/* ── SVG Icons ── */
function ArrowLeft() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19.92L8.48 13.4C7.71 12.63 7.71 11.37 8.48 10.6L15 4.08"
        stroke={C.white}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SearchIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 21L16.657 16.657M16.657 16.657C17.4 15.914 17.989 15.032 18.391 14.062C18.793 13.091 19 12.051 19 11C19 9.949 18.793 8.909 18.391 7.938C17.989 6.968 17.4 6.086 16.657 5.343C15.914 4.6 15.032 4.011 14.062 3.609C13.091 3.207 12.051 3 11 3C9.949 3 8.909 3.207 7.938 3.609C6.968 4.011 6.086 4.6 5.343 5.343C3.843 6.843 3 8.878 3 11C3 13.122 3.843 15.157 5.343 16.657C6.843 18.157 8.878 19 11 19C13.122 19 15.157 18.157 16.657 16.657Z"
        stroke={C.textGray}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CheckIcon({ color = C.badgeText }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12L10 17L20 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Filled purple checkmark circle — selected state */
function CheckCircleFilled() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Mask
        id="mask0"
        style={{ maskType: 'luminance' } as any}
        maskUnits="userSpaceOnUse"
        x={1}
        y={1}
        width={28}
        height={28}
      >
        <Path
          d="M15 27.5C16.64 27.5 18.27 27.18 19.78 26.55C21.3 25.92 22.68 25 23.84 23.84C25 22.68 25.92 21.3 26.55 19.78C27.18 18.27 27.5 16.64 27.5 15C27.5 13.36 27.18 11.73 26.55 10.22C25.92 8.7 25 7.32 23.84 6.16C22.68 5 21.3 4.08 19.78 3.45C18.27 2.82 16.64 2.5 15 2.5C13.36 2.5 11.73 2.82 10.22 3.45C8.7 4.08 7.32 5 6.16 6.16C5 7.32 4.08 8.7 3.45 10.22C2.82 11.73 2.5 13.36 2.5 15C2.5 16.64 2.82 18.27 3.45 19.78C4.08 21.3 5 22.68 6.16 23.84C7.32 25 8.7 25.92 10.22 26.55C11.73 27.18 13.36 27.5 15 27.5Z"
          fill="white"
          stroke="white"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <Path
          d="M10 15L13.75 18.75L21.25 11.25"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#mask0)">
        <Rect x={0} y={0} width={30} height={30} fill={C.secondary} />
      </G>
    </Svg>
  );
}

/** Semi-transparent purple plus — unselected state */
function AddButton() {
  return (
    <View style={styles.addBtnWrapper}>
      <View style={styles.addBtnCircle} />
      <Svg
        width={36}
        height={36}
        viewBox="0 0 36 36"
        fill="none"
        style={StyleSheet.absoluteFillObject}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.79 12.68C18.79 12.38 18.67 12.09 18.46 11.88C18.25 11.67 17.96 11.55 17.66 11.55C17.36 11.55 17.07 11.67 16.86 11.88C16.65 12.09 16.53 12.38 16.53 12.68V17.21H12C11.7 17.21 11.41 17.33 11.2 17.54C10.99 17.75 10.87 18.04 10.87 18.34C10.87 18.64 10.99 18.93 11.2 19.14C11.41 19.35 11.7 19.47 12 19.47H16.53V24C16.53 24.3 16.65 24.59 16.86 24.8C17.07 25.01 17.36 25.13 17.66 25.13C17.96 25.13 18.25 25.01 18.46 24.8C18.67 24.59 18.79 24.3 18.79 24V19.47H23.32C23.62 19.47 23.91 19.35 24.12 19.14C24.33 18.93 24.45 18.64 24.45 18.34C24.45 18.04 24.33 17.75 24.12 17.54C23.91 17.33 23.62 17.21 23.32 17.21H18.79V12.68Z"
          fill={C.white}
        />
      </Svg>
    </View>
  );
}

/* ── Data ── */
type FoodItem = {
  id: string;
  name: string;
  serving: string;
  kcal: number;
  badge: string;
};

const INITIAL_RESULTS: FoodItem[] = [
  { id: '1', name: '흰쌀밥', serving: '1인분 (210g)', kcal: 336, badge: '1천회 이상' },
  { id: '2', name: '흰쌀밥(즉석밥)', serving: '1인분 (210g)', kcal: 319, badge: '1천회 이상' },
];

/* ── Component ── */
export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['1']));

  const [isSheetVisible, setSheetVisible] = useState(false);
  const [targetFood, setTargetFood] = useState<FoodItem | null>(null);

  // 음식을 클릭했을 때 시트를 여는 함수
  const handleOpenSheet = (item: FoodItem) => {
    setTargetFood(item);
    setSheetVisible(true);
  };

  // 시트에서 '수정하기'를 눌렀을 때 실행될 로직
  const handleUpdateAmount = (id: string, count: number) => {
    console.log(`${id}번 음식을 ${count}인분으로 수정함`);
    // 여기서 전역 상태나 서버로 보낼 데이터를 업데이트하세요.
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleRecord = () => {
    const selectedItems = Array.from(selected);

    if (selectedItems.length === 0) {
      alert("기록할 음식을 선택해 주세요.");
      return;
    }

    router.replace({
      pathname: '/dietlog/result',
      params: { 
        addedItems: JSON.stringify(selectedItems),
        fromSearch: 'true' 
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>직접 검색하기</Text>
      </View>

      <View style={styles.body}>
        {/* ── Search bar ── */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="음식명 입력"
            placeholderTextColor={C.gray}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          <SearchIcon />
        </View>

        {/* ── Results list ── */}
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {INITIAL_RESULTS.map((item, index) => {
            const isSelected = selected.has(item.id);
            const isFirst = index === 0;
            return (
              <View 
                key={item.id} 
                style={[styles.foodRow, isFirst && styles.foodRowFirst]}
              >
                {/* 1. 왼쪽: 음식 정보 영역 (클릭 시 수량 수정 시트 오픈) */}
                <TouchableOpacity
                  style={styles.foodInfo}
                  onPress={() => handleOpenSheet(item)} // ✅ 여기로 위치 변경
                  activeOpacity={0.7}
                >
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodServing}>{item.serving}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                    <CheckIcon color={C.badgeText} />
                  </View>
                </TouchableOpacity>

                {/* 2. 오른쪽: 칼로리 및 선택 버튼 (클릭 시 즉시 추가/해제) */}
                <View style={styles.foodAction}>
                  <Text style={styles.kcal}>{item.kcal}kcal</Text>
                  <TouchableOpacity 
                    style={styles.iconHitSlop} // 터치 영역 최적화 스타일
                    onPress={() => {
                      console.log("아이콘 토글 호출:", item.id); // 디버깅용
                      toggleSelect(item.id);
                    }}
                  >
                    {isSelected ? <CheckCircleFilled /> : <AddButton />}
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <ServingSizeSheet 
        isVisible={isSheetVisible}
        onClose={() => setSheetVisible(false)}
        foodItem={targetFood}
        onUpdate={handleUpdateAmount}
      />

        {/* ── Record button ── */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity style={styles.recordBtn} onPress={handleRecord} activeOpacity={0.85}>
            <Text style={styles.recordBtnText}>기록하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.white,
  },

  /* ── Header ── */
  header: {
    backgroundColor: C.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 12,
    gap: 10,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    color: C.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },

  /* ── Body ── */
  body: {
    flex: 1,
    backgroundColor: C.white,
  },

  /* ── Search bar ── */
  searchBar: {
    marginHorizontal: 18,
    marginTop: 16,
    height: 50,
    borderRadius: 32,
    backgroundColor: C.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 16,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: C.text,
    paddingVertical: 0,
  },

  /* ── List ── */
  list: {
    flex: 1,
    marginTop: 24,
  },
  listContent: {
    paddingBottom: 16,
  },

  /* ── Food row ── */
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.lightGray,
    gap: 12,
  },
  foodRowFirst: {
    borderTopWidth: 1,
    borderTopColor: C.lightGray,
  },
  foodInfo: {
    flex: 1,                 
  paddingLeft: 16,         
  paddingVertical: 8,
  gap: 8,
  },
  foodName: {
    fontSize: 20,
    fontWeight: '600',
    color: C.secondary,
    lineHeight: 24,
  },
  foodServing: {
    fontSize: 16,
    fontWeight: '500',
    color: C.gray,
    lineHeight: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: C.badgeBg,
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 5,
    gap: 4,
  },
  badgeText: {
    color: C.badgeText,
    fontSize: 13,
    fontWeight: '500',
  },
  foodAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 16,
    flexShrink: 0,
  },
  kcal: {
    fontSize: 16,
    fontWeight: '500',
    color: C.textMuted,
    lineHeight: 20,
  },

  /* ── Add button (unselected) ── */
  addBtnWrapper: {
    width: 36,
    height: 36,
    position: 'relative',
  },
  addBtnCircle: {
    position: 'absolute',
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: 'rgba(146, 104, 151, 0.5)',
    top: 4.5,
    left: 4.5,
  },
  iconHitSlop: {
    padding: 5, // 아이콘 주변 터치 민감도 조절
  },

  /* ── Footer ── */
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: C.white,
  },
  recordBtn: {
    height: 50,
    borderRadius: 12,
    backgroundColor: C.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
