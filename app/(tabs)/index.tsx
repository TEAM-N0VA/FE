import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
  Circle,
} from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

// ─── Blood Sugar Chart ────────────────────────────────────────────────────────

function BloodSugarChart() {
  const yAxisWidth = 36;
  const chartWidth = CONTENT_WIDTH - yAxisWidth;
  const chartHeight = (chartWidth / 277) * 141;
  const tooltipHeight = 91;

  return (
    <View style={{ width: CONTENT_WIDTH }}>
      {/* Y-axis + Chart row */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Y-axis labels */}
        <View style={{ width: yAxisWidth, height: chartHeight + tooltipHeight, justifyContent: 'flex-end' }}>
          {['200', '160', '120', '80', '40', '0'].map((label) => (
            <Text key={label} style={styles.chartYLabel}>{label}</Text>
          ))}
        </View>

        {/* Chart area */}
        <View style={{ flex: 1, position: 'relative' }}>
          {/* Tooltip */}
          <View style={[styles.tooltip, { width: chartWidth * 0.62 }]}>
            <Text style={styles.tooltipTitle}>105 mg/dL  예측</Text>
            <Text style={styles.tooltipSub}>오이 | 오리고기 100g | 현미밥 100g</Text>
            <Text style={styles.tooltipTime}>오후 5시 30분</Text>
            {/* Triangle pointer */}
            <View style={styles.tooltipArrow} />
          </View>

          {/* SVG Graph */}
          <View style={{ marginTop: tooltipHeight - 14 }}>
            <Svg width={chartWidth} height={chartHeight} viewBox="0 0 277 141" preserveAspectRatio="none">
              <Defs>
                <SvgGradient id="g0" x1="166.475" y1="-17.377" x2="166.475" y2="77.5543" gradientUnits="userSpaceOnUse">
                  <Stop stopColor="#926897" />
                  <Stop offset="1" stopColor="#926897" stopOpacity="0.5" />
                </SvgGradient>
                <SvgGradient id="g1" x1="112.804" y1="-0.157" x2="112.804" y2="94.5" gradientUnits="userSpaceOnUse">
                  <Stop stopColor="#926897" />
                  <Stop offset="1" stopColor="#926897" stopOpacity="0.5" />
                </SvgGradient>
                <SvgGradient id="g2" x1="116.216" y1="31.87" x2="115.532" y2="141.487" gradientUnits="userSpaceOnUse">
                  <Stop stopColor="#926897" stopOpacity="0.7" />
                  <Stop offset="0.59642" stopColor="#FDE5F2" stopOpacity="0.7" />
                </SvgGradient>
              </Defs>
              {/* Dashed prediction line */}
              <Path
                d="M209 22.6984C216.104 10.0747 224.224 3.50952 235.896 6.03438C253.149 12.5988 273.448 45.9257 277 53.5"
                stroke="url(#g0)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Main solid line */}
              <Path
                d="M8 88.5888L11.4935 90.3107C14.9869 92.0327 21.9738 95.4767 28.9607 94.2363C35.9476 92.996 42.9345 87.0714 49.9214 83.786C56.9083 80.5005 63.8952 79.8542 70.8821 74.2057C77.869 68.5573 84.8559 57.9067 91.8428 52.1324C98.8297 46.3581 105.817 45.46 112.804 46.9956C119.79 48.5311 126.777 52.5002 133.764 49.6012C140.751 46.7022 147.738 36.9351 154.725 31.1356C161.712 25.3361 168.699 23.5043 175.686 29.2582C182.673 35.0121 188.647 48.3517 195.634 44.7134C202.621 41.0751 205.507 32.8081 209 22.5"
                stroke="url(#g1)"
                strokeWidth="2"
              />
              {/* Gradient fill area */}
              <Path
                d="M8 88.361L11.4955 90.069C14.991 91.7771 21.9819 95.1931 28.9729 93.9628C35.9638 92.7326 42.9548 86.856 49.9458 83.5972C56.9367 80.3383 63.9277 79.6972 70.9186 74.0945C77.9096 68.4918 84.9006 57.9276 91.8915 52.2001C98.8825 46.4725 105.873 45.5818 112.864 47.1049C119.855 48.628 126.846 52.5649 133.837 49.6894C140.828 46.8139 147.819 37.1259 154.81 31.3735C161.801 25.621 168.792 23.804 175.783 29.5113C182.774 35.2185 187.146 49.8019 196.756 44.8412C206.366 39.8805 209.623 22.3599 209.623 22.3599C209.623 22.3599 211.274 18.6834 214.183 14.8495C215.653 12.9113 216.314 11.6964 219.546 9.34305C226.214 4.78747 233.531 4.06771 240.019 8.34191C246.098 12.3466 253.154 18.5697 255.723 22.3599C259.776 26.2505 255.723 22.3599 259.776 26.8638C259.776 26.8638 259.83 26.9475 259.887 27.045C265.42 36.0552 274.668 43.8233 277 54.8967V140.497L8.00003 141.5L8 88.361Z"
                fill="url(#g2)"
                fillOpacity="0.3"
              />
              {/* Indicator dot */}
              <Circle cx="206" cy="22" r="5" fill="white" stroke="#494145" strokeOpacity="0.7" strokeWidth="2" />
            </Svg>
          </View>
        </View>
      </View>

      {/* X-axis labels */}
      <View style={[styles.chartXAxis, { paddingLeft: yAxisWidth }]}>
        <Text style={styles.chartXLabel}>오전 6시</Text>
        <Text style={styles.chartXLabel}>오후 12시</Text>
        <Text style={styles.chartXLabel}>오후 6시</Text>
      </View>
    </View>
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

// ─── Week Calendar ────────────────────────────────────────────────────────────

const DAYS = [
  { day: 'Mon', date: 16 },
  { day: 'Tue', date: 17 },
  { day: 'Wed', date: 18 },
  { day: 'Thu', date: 19, active: true },
  { day: 'Fri', date: 20, future: true },
  { day: 'Sat', date: 21, future: true },
  { day: 'Sun', date: 22, future: true },
];

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
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
            <Text style={styles.greetingName}>안녕하세요, 지윤님</Text>
            <Text style={styles.greetingSub}>꼬물이 임신 28주차(출산까지 D-117)</Text>
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
          {/* Top row */}
          <View style={styles.calendarTopRow}>
            <View>
              <Text style={styles.calendarDateSmall}>2026.03.19</Text>
              <Text style={styles.calendarDateBig}>Today</Text>
            </View>
            <TouchableOpacity style={styles.calendarMonthRow} activeOpacity={0.7}>
              <CalendarIcon />
              <Text style={styles.calendarMonthText}>2026년  3월</Text>
              <ChevronDownIcon />
            </TouchableOpacity>
          </View>

          {/* Week row */}
          <View style={styles.weekRow}>
            <TouchableOpacity style={styles.weekArrow}>
              <ChevronLeftIcon />
            </TouchableOpacity>

            {DAYS.map((item) => (
              <View key={item.date} style={styles.dayItem}>
                <Text
                  style={[
                    styles.dayLabel,
                    item.active && styles.dayLabelActive,
                    item.future && styles.dayLabelFuture,
                  ]}
                >
                  {item.day}
                </Text>
                {item.active && <View style={styles.activePill} />}
                <Text
                  style={[
                    styles.dayNumber,
                    item.active && styles.dayNumberActive,
                    item.future && styles.dayNumberFuture,
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            ))}

            <TouchableOpacity style={styles.weekArrow}>
              <ChevronRightIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Blood Sugar Section ── */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>오늘의 혈당</Text>
          <BloodSugarChart />
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
    paddingHorizontal: 14,
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
  },
  calendarMonthText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#494145',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});
