import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Path
} from 'react-native-svg';

import { getUserProfile } from '@/services/user';

import BloodSugarChart from '../../components/BloodSugarChart';

import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.locale('ko');
dayjs.extend(isoWeek);

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING = 25;
const CONTENT_WIDTH = SCREEN_WIDTH - PADDING * 2;

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function LogoIcon() {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M15.8352 0.00656919C24.6341 -0.254988 32.2114 7.32928 31.9955 16.4495C31.8354 23.2097 27.3623 29.0689 20.7533 31.2424C13.0754 33.7674 4.8125 29.7109 1.60001 23.0767C0.388998 20.5759 -0.31164 17.9696 0.13607 15.1825C0.528375 12.7403 0.884499 12.1297 3.15931 11.7265C3.77032 11.6182 3.81973 11.2716 3.78133 10.8055C3.66478 9.39073 3.94207 8.06358 4.78331 6.8921C5.93039 5.29469 7.52295 4.54795 9.51684 4.62757C9.86963 4.64166 10.1805 4.70226 10.3352 4.22396C11.171 1.64009 13.0959 0.366645 15.8352 0.00656919ZM14.3849 11.0268C13.871 13.3588 12.3997 14.7135 10.0127 15.1476C9.58309 15.2257 9.17517 15.2692 8.94622 14.8196C8.57426 14.0892 8.98806 12.9391 9.72346 12.4933C10.0935 12.2689 10.4628 12.0167 10.7607 11.7102C11.6688 10.776 11.5926 9.31196 10.6291 8.49109C9.64931 7.65634 8.21155 7.77952 7.35676 8.77143C6.67428 9.56341 6.66287 10.8677 7.42861 11.8811C8.00634 12.6458 8.25834 13.4545 8.08951 14.3755C7.82089 15.8407 7.36003 17.2578 6.86853 18.6624C6.60189 19.4244 5.99367 19.6159 5.25386 19.2764C4.65228 19.0004 4.65691 18.4933 4.6593 17.9661C4.66257 17.2424 4.5721 16.5643 3.72515 16.2448C2.81319 18.9083 5.01529 23.426 8.35939 25.9907C12.1281 28.8809 17.1526 29.0918 19.6809 27.8031C19.2464 27.2258 19.3285 26.5877 19.4565 25.9344C19.8882 23.7308 18.6519 22.1219 16.3396 22.0623C13.5372 21.9901 11.8204 20.4318 10.5092 18.2527C10.0669 17.5175 10.3246 16.7143 11.0524 16.226C11.7907 15.7307 12.3762 16.0018 12.8981 16.5745C13.1121 16.8093 13.3227 17.0496 13.5101 17.3048C14.3177 18.4045 15.3498 18.9302 16.7906 18.9183C20.1203 18.8908 22.6442 21.5273 22.5232 24.7764C22.5016 25.358 22.4499 25.9386 22.4098 26.5545C25.437 25.3387 28.4679 20.6057 28.4374 17.1715C28.0413 17.2993 27.6611 17.4231 27.2801 17.5446C24.381 18.4689 21.55 17.0078 20.5881 14.1742C20.0668 12.6383 20.4176 11.1722 20.7279 9.69103C21.0135 8.3278 20.9446 7.01196 20.3113 5.75517C19.4266 3.9994 17.331 3.02147 15.5689 3.50349C14.6327 3.75958 13.9895 4.36423 13.5198 5.14977C13.2176 5.65533 12.873 5.75617 12.3676 5.47027C12.2225 5.38816 12.0482 5.35543 11.7092 5.2388C13.7212 6.76399 14.6572 8.56006 14.3849 11.0268Z"
        fill="#926897"
      />
    </Svg>
  );
}

function CalendarIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M8 2V5" stroke="#494145" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 2V5" stroke="#494145" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#494145" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3.5 9.08997H20.5" stroke="#494145" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.6947 13.7H15.7037" stroke="#494145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.6947 16.7H15.7037" stroke="#494145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.9955 13.7H12.0045" stroke="#494145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.9955 16.7H12.0045" stroke="#494145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.29431 13.7H8.30329" stroke="#494145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.29431 16.7H8.30329" stroke="#494145" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronDownIcon() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path d="M13.2802 5.96667L8.93355 10.3133C8.42021 10.8267 7.58022 10.8267 7.06688 10.3133L2.72021 5.96667" stroke="#494145" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronLeftIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M14.9998 19.92L8.47984 13.4C7.70984 12.63 7.70984 11.37 8.47984 10.6L14.9998 4.07996" stroke="#494145" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRightIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M8.91016 19.92L15.4302 13.4C16.2002 12.63 16.2002 11.37 15.4302 10.6L8.91016 4.07996" stroke="#494145" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Nutrient Bar ─────────────────────────────────────────────────────────────

function NutrientBar({
  label,
  value,
  max,
  barColor,
}: {
  label: string;
  value: number;
  max: number;
  barColor: string;
}) {
  const progress = Math.min(value / max, 1);
  return (
    <View style={styles.nutrientItem}>
      <Text style={styles.nutrientLabel}>{label}</Text>
      <View style={styles.nutrientTrack}>
        <View style={[styles.nutrientFill, { width: `${progress * 100}%` as any, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.nutrientValue}>
        {value}/{max}g
      </Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [showPicker, setShowPicker] = useState(false);
  const onValueChange = useCallback(
    (event: any, newDate: Date) => {
      // 1. 피커 닫기
      setShowPicker(false);

      // 2. 확인(OK) 버튼을 눌렀을 때만 로직 실행
      if (event === 'dateSetAction' && newDate) {
        const selectedDateObj = dayjs(newDate);
        
        // 해당 월의 1일 날짜 객체 생성
        const firstDayOfMonth = selectedDateObj.date(1);
        
        // 그 1일이 포함된 주의 월요일(isoWeek) 찾기
        const firstWeekStart = firstDayOfMonth.startOf('isoWeek');
        
        // 상태 업데이트
        setCurrentWeekStart(firstWeekStart);
        setSelectedDate(firstDayOfMonth); // 1일로 선택일 변경
      }
    },
    [] // 의존성 배열
  );
  
  const [selectedDate, setSelectedDate] = useState(dayjs());
  
  const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf('isoWeek'));

  const [reportData, setReportData] = useState<any>(null);  
  const [userData, setUserData] = useState<any>(null);

  const daysInWeek = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = currentWeekStart.add(i, 'day');
      return {
        fullDate: date,
        dayName: date.format('ddd').toUpperCase(), // MON, TUE...
        dateNum: date.date(),
        isToday: date.isSame(dayjs(), 'day'),
        isSelected: date.isSame(selectedDate, 'day'),
      };
    });
  }, [currentWeekStart, selectedDate]);

  const moveWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev') setCurrentWeekStart(prev => prev.subtract(1, 'week'));
    else setCurrentWeekStart(prev => prev.add(1, 'week'));
  };

  useEffect(() => {
  const loadProfile = async () => {
    try{
      const profile = await getUserProfile(111); // 기존에 만든 프로필 API
      setUserData(profile);
    } catch (error) {
      console.log("로드 실패", error);
      setUserData({
        nickname: "지윤",       
        pregnancy_week: 28,
        d_day: 117
      });
    }
  };
    loadProfile();
  }, []);

  useEffect(() => {
    const loadDailyReport = async () => {
      const dateStr = selectedDate.format('YYYY-MM-DD');

      try {
        const response = await axios.get(`/api/report/daily?date=${dateStr}&user_id=111`);
        setReportData(response.data.data);
      } catch (error) {
        // console.error("리포트 로드 실패:", error);
        const mockData = {
  date: "2026-04-25",
  
  // 1. 하루 전체 합계 (summary -> daily_total_calories로 이름 변경됨)
  summary: { 
    daily_total_calories: 1082, 
    total_carbs: 78.5, 
    total_protein: 45.0, 
    total_fat: 32.2 
  },

  // 2. 통합 혈당 그래프 데이터 (blood_sugar_graph로 묶음)
  blood_sugar_graph: {
    target_bloodsugar: 120.0,
    timeline: [
      { 
        id: 1, 
        type: "ACTUAL", 
        value: 95, 
        measured_at: "2026-04-25T07:10:00", 
        record_type: "공복",
        related_meal: null,
      },
      { 
        id: 2, 
        type: "ACTUAL", 
        value: 130, 
        measured_at: "2026-04-25T09:30:00", 
        record_type: "식후1시간",
        related_meal: {
          meal_log_id: 501,
          foods: ["오리고기", "현미밥", "오이"],
          eaten_at: "2026-04-25T08:30:00"
        }
      },
      { 
        id: 3, 
        type: "ACTUAL", 
        value: 130, 
        measured_at: "2026-04-25T13:30:00", 
        record_type: "식후1시간",
        related_meal: {
          meal_log_id: 501,
          foods: ["오리고기", "현미밥", "오이"],
          eaten_at: "2026-04-25T12:30:00"
        }
      },
      
      { 
        id: 105, 
        type: "PREDICTED", 
        value: 140, 
        measured_at: "2026-04-25T21:30:00", // 예측 시간
        record_type: "식후2시간",
        advice: "다음 식사에는 식이섬유를 더 추가해보세요.",
        related_meal: {
          meal_log_id: 501,
          foods: ["오리고기", "현미밥", "오이"],
          eaten_at: "2026-04-25T20:30:00"
        }
      },
    ]
  },

  // 3. 오늘의 식단 리스트 (하단 카드용)
  meal_logs: [
    { 
      meal_log_id: 501, 
      meal_type: "아침", 
      eaten_at: "2026-04-25T08:30:00", 
      img_url: "https://api.builder.io/api/v1/image/assets/TEMP/003e83e9edd9db5a23a822771f9ce649d6f936b9", 
      total_calories: 632.0, 
      is_analyzed: true,
      foods: ["오리고기", "현미밥", "오이"] 
    }
  ]
};
      setReportData(mockData);
      }
    };
    loadDailyReport();
  }, [selectedDate]); // ✅ selectedDate가 변경될 때마다 실행

  if (!userData || !reportData) return <View><Text>로딩 중...</Text></View>;

  return (
    <View style={{ flex: 1 }}>
    <LinearGradient
      colors={['#FDE5F2', '#FDE5F2', '#F8F7F7', '#F8F7F7']}
      locations={[0, 0.05, 0.4, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Logo Header ── */}
        <View style={styles.logoRow}>
          <LogoIcon />
          <Text style={styles.logoText}>밀당</Text>
        </View>

        {/* ── Greeting + Illustration ── */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingTextBlock}>
            <Text style={styles.greetingName}>안녕하세요, {userData.nickname}님</Text>
            <Text style={styles.greetingSub}>임신 {userData.pregnancy_week}주차(출산까지 D-{userData.d_day})</Text>
            <Text style={styles.greetingSub}>오늘도 건강한 하루 보내세요!</Text>
          </View>
          <Image
            source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/a2b25356307440b3ecdf2d96b5c492ae8d03aff5?width=174' }}
            style={styles.pregnantImage}
            resizeMode="contain"
          />
        </View>

        {/* ── Calendar Card ── */}
        <View style={styles.calendarCard}>
            <View style={styles.calendarTopRow}>
              <View>
                {/* 왼쪽 상단: 날짜 표기 수정 */}
                <Text style={styles.calendarDateSmall}>{selectedDate.format('YYYY.MM.DD')}</Text>
                <Text style={styles.calendarDateBig}>
                  {selectedDate.isSame(dayjs(), 'day') ? 'Today' : selectedDate.format('dddd')}
                </Text>
              </View>
              {/* 오른쪽 상단: 연월 토글 */}
              <TouchableOpacity 
                style={styles.calendarMonthRow} 
                activeOpacity={0.7}
                onPress={() => setShowPicker(true)}
              >
                <CalendarIcon />
                <Text style={styles.calendarMonthText}>{currentWeekStart.format('YYYY년 M월')}</Text>
                <ChevronDownIcon />
              </TouchableOpacity>
            </View>

          {/* Week row */}
          <View style={styles.weekRow}>
              {/* 왼쪽 화살표 */}
              <TouchableOpacity onPress={() => moveWeek('prev')} style={styles.weekArrow}>
                <ChevronLeftIcon />
              </TouchableOpacity>

            {daysInWeek.map((item) => (
                <TouchableOpacity 
                  key={item.fullDate.toString()} 
                  style={styles.dayItem}
                  onPress={() => setSelectedDate(item.fullDate)}
                >
                  <Text
                    style={[
                      styles.dayLabel,
                      item.isSelected && styles.dayLabelActive,
                    ]}
                  >
                    {item.dayName}
                  </Text>
                  {item.isSelected && <View style={styles.activePill} />}
                  <Text
                    style={[
                      styles.dayNumber,
                      item.isSelected && styles.dayNumberActive,
                    ]}
                  >
                    {item.dateNum}
                  </Text>
                </TouchableOpacity>
              ))}

            <TouchableOpacity onPress={() => moveWeek('next')} style={styles.weekArrow}>
                <ChevronRightIcon />
            </TouchableOpacity>

            
          </View>
        </View>

        {/* ── Blood Sugar Section ── */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>오늘의 혈당</Text>
          <BloodSugarChart data={reportData.blood_sugar_graph} />
        </View>

        {/* ── Today's Meals Section ── */}
        <View style={[styles.sectionContainer, { marginBottom: 24 }]}>
          <Text style={styles.sectionTitle}>오늘의 식단</Text>

          <View style={styles.mealCard}>
            {/* Calorie + nutrients row */}
            <View style={styles.mealSummaryRow}>
              <Text style={styles.mealCalories}>1082kcal</Text>
              <View style={styles.nutrientsRow}>
                <NutrientBar label="탄수화물" value={78} max={90} barColor="#67BD6E" />
                <NutrientBar label="단백질" value={45} max={70} barColor="#F47551" />
                <NutrientBar label="지방" value={95} max={110} barColor="#F8D558" />
              </View>
            </View>

            {/* Meal cards row */}
            <View style={styles.mealItemsRow}>
              {/* 아침 - breakfast with photo */}
              <View style={styles.mealItemWrapper}>
                <View style={[styles.mealItemBox, { overflow: 'hidden' }]}>
                  <Image
                    source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/003e83e9edd9db5a23a822771f9ce649d6f936b9?width=140' }}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                  <View style={styles.mealPhotoOverlay} />
                  <Text style={styles.mealCalText}>632</Text>
                </View>
                <Text style={styles.mealItemLabel}>아침</Text>
              </View>

              {/* 점심 - lunch */}
              <View style={styles.mealItemWrapper}>
                <View style={[styles.mealItemBox, { backgroundColor: '#E9E1EA' }]}>
                  <Text style={styles.mealLunchCal}>450</Text>
                </View>
                <Text style={styles.mealItemLabel}>점심</Text>
              </View>

              {/* 저녁 - dinner */}
              <View style={styles.mealItemWrapper}>
                <View style={[styles.mealItemBox, { backgroundColor: '#E0DCDE', justifyContent: 'center', alignItems: 'center' }]}>
                  <Image
                    source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/f2d186e07437a6730ebac2b28ac668a23c9fc4ff?width=70' }}
                    style={{ width: 35, height: 35 }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.mealItemLabel}>저녁</Text>
              </View>

              {/* 간식 - snack */}
              <View style={styles.mealItemWrapper}>
                <View style={[styles.mealItemBox, { backgroundColor: '#E0DCDE', justifyContent: 'center', alignItems: 'center' }]}>
                  <Image
                    source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/1299d87d26c57a7dae41c50362bbdac185317a52?width=60' }}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.mealItemLabel}>간식</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
    <Modal visible={showPicker} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>연월 선택</Text>
          <View style={styles.modalGrid}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => (
              <TouchableOpacity 
                key={m} 
                style={styles.monthBtn}
                onPress={() => {
                  // 라이브러리 대신 직접 만든 로직 실행
                  const year = dayjs().year(); // 현재 연도 고정 (필요시 연도 변경 버튼 추가)
                  const firstDay = dayjs().year(year).month(m - 1).date(1);
                  setCurrentWeekStart(firstDay.startOf('isoWeek'));
                  setSelectedDate(firstDay);
                  setShowPicker(false);
                }}
              >
                <Text style={styles.monthText}>{m}월</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.closeBtn}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <TouchableOpacity 
        style={[styles.floatingButton, { bottom: insets.bottom + 20 }]} 
        activeOpacity={0.8}
        onPress={() => router.push('/chat')} // 5. 채팅 경로 이동
      >
        <View style={styles.fabInner}>
          {/* 채팅 아이콘 (간단한 Svg로 대체) */}
          <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <Path 
              d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5L13.2 21.3C12.5 22 11.5 22 10.8 21.3L8.5 19Z" 
              fill="#FFFFFF" 
            />
          </Svg>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: PADDING,
    paddingBottom: 16,
  },

  // Logo
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    marginBottom: 8,
  },
  logoText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    color: '#2E292B',
    letterSpacing: 1.8,
  },

  // Greeting
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    minHeight: 140,
  },
  greetingTextBlock: {
    flex: 1,
    gap: 6,
    paddingTop: 8,
  },
  greetingName: {
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: '600',
    color: '#494145',
    lineHeight: 24,
  },
  greetingSub: {
    fontSize: 14,
    fontWeight: '500',
    color: '#494145',
    lineHeight: 17,
  },
  pregnantImage: {
    width: 87,
    height: 158,
  },

  // Calendar card
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  calendarTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  calendarDateSmall: {
    fontSize: 11,
    color: '#494145',
    fontWeight: '400',
  },
  calendarDateBig: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E292B',
    lineHeight: 24,
  },
  calendarMonthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 5,
  },
  calendarMonthText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#494145',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  weekArrow: {
    padding: 2,
  },
  dayItem: {
    alignItems: 'center',
    width: 36,
    position: 'relative',
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.9)',
    lineHeight: 20,
  },
  dayLabelActive: {
    color: '#FFFFFF',
    zIndex: 1,
  },
  dayLabelFuture: {
    color: 'rgba(0,0,0,0.4)',
  },
  activePill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#926897',
    borderRadius: 20,
    zIndex: 0,
  },
  dayNumber: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.9)',
    lineHeight: 20,
    zIndex: 1,
  },
  dayNumberActive: {
    color: '#FFFFFF',
  },
  dayNumberFuture: {
    color: 'rgba(0,0,0,0.4)',
  },

  // Section
  sectionContainer: {
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#494145',
    lineHeight: 22,
  },

  // Chart
  chartYLabel: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.8)',
    textAlign: 'right',
    lineHeight: 22,
    flex: 1,
    paddingRight: 4,
    includeFontPadding: false,
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  chartXLabel: {
    fontSize: 11,
    color: '#494145',
    fontWeight: '400',
  },

  // Tooltip
  tooltip: {
    backgroundColor: '#926897',
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingTop: 12,
    paddingBottom: 10,
    position: 'relative',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  tooltipTitle: {
    color: '#FDE5F2',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 19,
  },
  tooltipSub: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 22,
  },
  tooltipTime: {
    color: '#F8F7F7',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 22,
  },
  tooltipArrow: {
    position: 'absolute',
    bottom: -10,
    right: 18,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#926897',
  },

  // Meal card
  mealCard: {
    borderWidth: 1,
    borderColor: '#C8C1C4',
    borderRadius: 12,
    backgroundColor: '#F8F7F7',
    padding: 11,
    gap: 11,
  },
  mealSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  mealCalories: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 24,
  },
  nutrientsRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  nutrientItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  nutrientLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#494145',
    lineHeight: 22,
  },
  nutrientTrack: {
    height: 4,
    width: '100%',
    backgroundColor: '#E9E9E9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  nutrientFill: {
    height: '100%',
    borderRadius: 2,
  },
  nutrientValue: {
    fontSize: 11,
    fontWeight: '500',
    color: '#878488',
    lineHeight: 20,
  },
  mealItemsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  mealItemWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  mealItemBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealPhotoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.50)',
    borderRadius: 12,
  },
  mealCalText: {
    color: '#F8F7F7',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.65,
    zIndex: 1,
  },
  mealLunchCal: {
    color: '#926897',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.65,
  },
  mealItemLabel: {
    fontSize: 10,
    fontWeight: '400',
    color: '#7F7178',
    letterSpacing: 0.5,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#926897',
    // 그림자 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    // 그림자 (Android)
    elevation: 8,
  },
  fabInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#494145',
    marginBottom: 20,
  },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  monthBtn: {
    width: '28%',
    aspectRatio: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E1EA',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#926897',
  },
  closeBtn: {
    marginTop: 20,
    padding: 10,
  },
  closeBtnText: {
    color: '#7F7178',
    fontSize: 14,
  },
});
