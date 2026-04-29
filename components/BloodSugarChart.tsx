import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Defs, Path, Stop, LinearGradient as SvgGradient } from 'react-native-svg';
import { BloodSugarGraphData, BloodSugarTimelineItem } from '../services/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTENT_WIDTH = SCREEN_WIDTH - 40; // 양옆 마진 제외

interface Props {
  data: BloodSugarGraphData;
}

export default function BloodSugarChart({ data }: Props) {
  const [selectedPoint, setSelectedPoint] = useState<BloodSugarTimelineItem | null>(null);

  const sortedTimeline = useMemo(() => {
    return [...data.timeline].sort((a, b) => dayjs(a.measured_at).unix() - dayjs(b.measured_at).unix());
  }, [data.timeline]);

  const { target_bloodsugar, timeline } = data;
  const yAxisWidth = 35;
  const chartWidth = CONTENT_WIDTH - yAxisWidth;
  const chartHeight = 150;

  // 좌표 변환 로직 (오전 6시 ~ 오후 10시 기준)
  const getCoords = (measuredAt: string, value: number) => {
    const time = dayjs(measuredAt);
    const startHour = 6;
    const endHour = 24;
    const totalMinutes = (endHour - startHour) * 60;
    
    // 하루 시작(6시)으로부터 몇 분 지났는지 계산
    const minutesFromStart = (time.hour() - startHour) * 60 + time.minute();
    const x = (minutesFromStart / totalMinutes) * chartWidth;
    const y = chartHeight - (value / 200) * chartHeight; // 혈당 200을 Max로 가정
    
    return { x: Math.max(0, Math.min(x, chartWidth)), y };
  };

  // 경로(Path) 데이터 생성
  const makeDegreePath = (points: any[], extendStart = false, extendEnd = false) => {
    if (points.length === 0) return "";
    const coords = points.map(p => getCoords(p.measured_at, p.value));
    
    let d = "";
    let firstCoord = coords[0];
    let lastCoord = coords[coords.length - 1];

    if (extendStart) {
      // 00시 연장: 첫 번째와 두 번째 점의 기울기를 이용해 00시의 Y값을 자연스럽게 추정
      const startX = 0;
      let startY = firstCoord.y;
      if (coords.length > 1) {
        const slope = (coords[1].y - firstCoord.y) / (coords[1].x - firstCoord.x);
        startY = firstCoord.y - slope * firstCoord.x;
      }
      d = `M ${startX} ${startY}`;
      const cpX = (startX + firstCoord.x) / 2;
      d += ` C ${cpX} ${startY}, ${cpX} ${firstCoord.y}, ${firstCoord.x} ${firstCoord.y}`;
    } else {
      d = `M ${firstCoord.x} ${firstCoord.y}`;
    }

    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cpX = curr.x + (next.x - curr.x) / 2;
      d += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }

    if (extendEnd) {
      // 24시 연장: 마지막 두 점의 흐름을 따라 24시 지점 연결
      const endX = chartWidth;
      let endY = lastCoord.y;
      if (coords.length > 1) {
        const prev = coords[coords.length - 2];
        const slope = (lastCoord.y - prev.y) / (lastCoord.x - prev.x);
        endY = lastCoord.y + slope * (endX - lastCoord.x);
      }
      const cpX = (lastCoord.x + endX) / 2;
      d += ` C ${cpX} ${lastCoord.y}, ${cpX} ${endY}, ${endX} ${endY}`;
    }
    
    return d;
  };
  
  const actualPoints = sortedTimeline.filter(p => p.type === 'ACTUAL');
  const predictedPoints = sortedTimeline.filter(p => p.type === 'PREDICTED');

  const actualPath = makeDegreePath(actualPoints, true, false);
  // 예측선은 실제의 마지막 점부터 시작
  const lastActual = actualPoints[actualPoints.length - 1];
  const predictedPath = makeDegreePath(lastActual ? [lastActual, ...predictedPoints] : predictedPoints, false, true);
  // 그래디언트 채우기 경로
  const fillPath = actualPoints.length > 0 
    ? `${actualPath} V ${chartHeight} H 0 Z` 
    : "";

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ width: yAxisWidth, height: chartHeight, justifyContent: 'space-between' }}>
          {['200', '150', '100', '50', '0'].map(label => (
            <Text key={label} style={styles.chartYLabel}>{label}</Text>
          ))}
        </View>

        <View style={{ flex: 1, position: 'relative' }}>
          {/* ── 2. 지점 인근 부유형 툴팁 ── */}
          {selectedPoint && (() => {
            const { x, y } = getCoords(selectedPoint.measured_at, selectedPoint.value);
            return (
              <View style={[styles.floatingTooltip, { left: x - 60, top: y - 75 }]}>
                <View style={styles.tooltipContent}>
                  <Text style={styles.tooltipValue}>{selectedPoint.value} mg/dL</Text>
                  <Text style={styles.tooltipMeal} numberOfLines={1}>
                    {selectedPoint.related_meal?.foods[0]}...
                  </Text>
                </View>
                <View style={styles.tooltipArrow} />
              </View>
            );
          })()}

          <Svg width={chartWidth} height={chartHeight} style={{ overflow: 'visible' }}>
            <Defs>
              <SvgGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#926897" stopOpacity="0.2" />
                <Stop offset="1" stopColor="#926897" stopOpacity="0" />
              </SvgGradient>
            </Defs>

            {/* 가이드 라인 */}
            <Path
              d={`M 0 ${chartHeight - (target_bloodsugar / 200) * chartHeight} H ${chartWidth}`}
              stroke="#926897" strokeWidth="1" strokeDasharray="4 2" opacity="0.4"
            />

            <Path d={fillPath} fill="url(#fillGradient)" />
            <Path d={actualPath} stroke="#926897" strokeWidth="3" fill="none" />
            <Path d={predictedPath} stroke="#926897" strokeWidth="2.5" fill="none" strokeDasharray="5 5" opacity="0.6" />

            {sortedTimeline.map((p) => {
              const { x, y } = getCoords(p.measured_at, p.value);
              const isSelected = selectedPoint?.id === p.id;
              return (
                <React.Fragment key={p.id}>
                <Circle
                  key={p.id} cx={x} cy={y} r={isSelected ? "6" : "4"}
                  fill={isSelected ? "#926897" : "white"}
                  stroke="#926897" strokeWidth="2"
                  pointerEvents="none"
                  
                />
              </React.Fragment>
              );
            })}
          </Svg>
          <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {sortedTimeline.map((p) => {
              const { x, y } = getCoords(p.measured_at, p.value);
              return (
                <TouchableOpacity
                  key={`touch-${p.id}`}
                  activeOpacity={0.6}
                  onPress={() => {
                    console.log("터치됨:", p.value); // 터치 확인용
                    setSelectedPoint(p);
                  }}
                  style={{
                    position: 'absolute',
                    left: x - 25, // 터치 반경 보정 (가운데 정렬)
                    top: y - 25,
                    width: 50,    // 터치 영역 대폭 확장
                    height: 50,
                    
                    borderRadius: 25,
                  }}
                />
              );
            })}
          </View>
        </View>
      </View>

      {/* X축 */}
      <View style={[styles.chartXAxis, { paddingLeft: yAxisWidth }]}>
        <Text style={styles.chartXLabel}>06시</Text>
        <Text style={styles.chartXLabel}>12시</Text>
        <Text style={styles.chartXLabel}>18시</Text>
        <Text style={styles.chartXLabel}>24시</Text>
      </View>

      {/* 하단 상세 정보 카드는 UX 보완용으로 유지 (선택 시 등장) */}
      {selectedPoint && (
        <View style={styles.detailCard}>
          <Text style={styles.cardHeader}>상세 기록</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardInfoLabel}>측정 혈당</Text>
            <Text style={styles.cardInfoValue}>{selectedPoint.value} mg/dL</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardInfoLabel}>상태/식사</Text>
            <Text style={styles.cardInfoValue}>
              {selectedPoint.related_meal 
                ? `🍴 ${selectedPoint.related_meal.foods.join(', ')}` 
                : `📋 ${selectedPoint.record_type}`}
            </Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardInfoLabel}>측정 시간</Text>
            <Text style={styles.cardInfoValue}>{dayjs(selectedPoint.measured_at).format('A h시 mm분')}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chartYLabel: { fontSize: 10, color: '#878488', textAlign: 'right', paddingRight: 5 },
  chartXAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  chartXLabel: { fontSize: 10, color: '#878488' },
  tooltipBox: { backgroundColor: '#926897', borderRadius: 12, padding: 10, marginBottom: 10 },
  tooltipTitle: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  tooltipSub: { color: '#EEE', fontSize: 11, marginTop: 2 },
  tooltipTime: { color: '#FDE5F2', fontSize: 10, marginTop: 2 },
  infoText: { color: '#AAA', fontSize: 12, textAlign: 'center' },
  container: { marginTop: 10 },
  yAxis: { width: 36, height: 160, justifyContent: 'space-between', paddingBottom: 5 },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  axisText: { fontSize: 10, color: '#878488' },
  detailCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E9E1EA',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardValue: { fontSize: 22, fontWeight: '700', color: '#2E292B' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  cardFoods: { fontSize: 14, color: '#494145', marginBottom: 4 },
  cardTime: { fontSize: 12, color: '#878488' },
  cardAdvice: { fontSize: 12, color: '#926897', marginTop: 8, fontWeight: '500' },
  floatingTooltip: {
    position: 'absolute',
    width: 120,
    alignItems: 'center',
    zIndex: 100,
  },
  tooltipContent: {
    backgroundColor: '#494145',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    alignItems: 'center',
  },
  tooltipValue: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  tooltipMeal: { color: '#FDE5F2', fontSize: 10, marginTop: 2 },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#494145',
  },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardInfoLabel: { fontSize: 13, color: '#878488' },
  cardInfoValue: { fontSize: 13, color: '#494145', fontWeight: '500' },
});