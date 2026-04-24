// app/(tabs)/bloodsugar/result.tsx
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Colors } from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { postBloodSugar } from '@/services/bloodSugar';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const getRiskLevel = (val: number, step: string) => {
  let thresholds = { safe: 140, risk: 160 }; // 기본값 (식후 1시간 기준)

  if (step === '공복') {
    thresholds = { safe: 95, risk: 110 };
  } else if (step === '식후 2시간') {
    thresholds = { safe: 120, risk: 140 };
  } else if (step === '식사 전' || step === '취침 전') {
    thresholds = { safe: 100, risk: 120 }; // 일반적인 기준치 추가
  }

  if (val < thresholds.safe) 
    return { label: '안전', color: Colors.safe, bg: Colors.safe_back };
  if (val <= thresholds.risk) 
    return { label: '주의', color: Colors.caution, bg: Colors.caution_back };
  
  return { label: '위험', color: Colors.risk, bg: Colors.risk_back };
};

const BloodSugarResult = () => {
 const { measuredAt, step, value, memo } = useLocalSearchParams();
 
 const numericValue = parseFloat(value as string) || 0;
 const risk = getRiskLevel(numericValue, step as string);
 const resultValue = value; 
 const type = step;
// UI용 시간 포맷팅 (예: 10:30 AM)
const displayTime = new Date(measuredAt as string).toLocaleTimeString([], { 
  hour: '2-digit', 
  minute: '2-digit' 
});


const handleFinalSubmit = async () => {
    try {
      await postBloodSugar({
        user_id: 12, // ✅ 테스트용 고정 ID
        measured_at: measuredAt as string,
        value: numericValue,
        recorded_type: step as string,
        risk_level: risk.label,
        memo: (memo as string) || ""
      });
      alert("기록이 저장되었습니다.");
      router.replace('/(tabs)');
    } catch (e) {
      console.error("저장 실패:", e);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.headerTitle, typography?.h3]}>〈 혈당 기록</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleArea}>
        <Text style={[styles.completeText, typography?.h2]}>기록완료</Text>
        {/* ✅ 선택한 시점에 맞는 기준을 동적으로 표시 */}
        <Text style={[styles.descText, typography?.body1]}>
            {type} 기준치({
            type === '공복' ? '95' : 
            type === '식후 1시간' ? '140' : 
            type === '식후 2시간' ? '120' : '100'
            }mg/dL)보다 {numericValue > (type === '공복' ? 95 : 140) ? '높아요' : '안정적이에요'}
        </Text>
      </View>

      <View style={styles.contentSheet}>
        <Card style={styles.resultCard}>
          <View style={styles.cardHeader}>
            <Text style={typography?.body2}>{type} 혈당</Text>
            <Text style={typography?.body2}>{displayTime}</Text>
          </View>
          
          <View style={styles.valueRow}>
            <Text style={styles.bigValue}>{resultValue}</Text>
            <Text style={styles.unitText}>mg/dL</Text>
            <View style={[styles.statusBadge, { backgroundColor: risk.bg }]}>
                <Text style={[styles.statusText, { color: risk.color }]}>{risk.label}</Text>
            </View>
          </View>

          {/* 수치 바 */}
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: '60%', backgroundColor: Colors.primary }]} />
            <View style={styles.barLabelRow}>
              <Text style={styles.barLabel}>40</Text>
              <Text style={styles.barLabel}>120</Text>
              <Text style={styles.barLabel}>200</Text>
            </View>
          </View>
        </Card>

        <View style={styles.footer}>
          <Button title="식단 추천 보기" onPress={() => {}} variant="primary" />
          <Button title="홈으로" onPress={() => router.replace('/(tabs)')} variant="outline" style={styles.homeBtn} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary },
  header: { marginTop: 40, padding: 20 },
  headerTitle: { color: Colors.white },
  titleArea: { paddingHorizontal: 20, marginBottom: 20 },
  backButton: { alignSelf: 'flex-start' },
  completeText: { color: Colors.white, fontWeight: '700' },
  descText: { color: Colors.white, marginTop: 5 },
  contentSheet: { flex: 1, backgroundColor: Colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 },
  resultCard: { padding: 20, marginTop: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  bigValue: { fontSize: 40, fontWeight: 'bold', color: Colors.primary },
  unitText: { fontSize: 18, color: Colors.lightgray },
  statusBadge: { backgroundColor: '#FFEDED', paddingHorizontal: 10, borderRadius: 5, marginLeft: 10 },
  statusText: { color: '#FF5252', fontSize: 12, fontWeight: 'bold' },
  barContainer: { marginTop: 30 },
  bar: { height: 8, borderRadius: 4 },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  barLabel: { fontSize: 10, color: Colors.lightgray },
  footer: { marginTop: 'auto', gap: 10, paddingBottom: 30 },
  homeBtn: { backgroundColor: Colors.secondary_back, borderColor: 'transparent' }
});

export default BloodSugarResult;