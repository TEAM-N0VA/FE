// app/(tabs)/bloodsugar/result.tsx
import Button from '@/components/Button';
import Card from '@/components/Card';
import SubHeader from '@/components/SubHeader';
import { Colors } from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { postBloodSugar } from '@/services/bloodSugar';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const getRiskLevel = (val: number, step: string) => {
  let thresholds = { safe: 140, risk: 160 }; // 기본값 (식후 1시간 기준)

  if (step === '공복') {
    thresholds = { safe: 95, risk: 110 };
  } else if (step === '식후 2시간') {
    thresholds = { safe: 120, risk: 140 };
  } else if (step === '식사 전' || step === '취침 전') {
    thresholds = { safe: 100, risk: 120 }; 
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

 const progress = Math.min(Math.max(((numericValue - 40) / (200 - 40)) * 100, 0), 100);

 const risk = getRiskLevel(numericValue, step as string);
 const type = step;

 const dateObj = measuredAt ? new Date(measuredAt as string) : new Date();
 const displayTime = isNaN(dateObj.getTime()) 
    ? "시간 정보 없음" 
    : dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


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
      <SubHeader 
        title="혈당 기록" 
        onBack={() => router.push({
          pathname: '/bloodsugar/input',
          params: { measuredAt, step, value, memo, fromResult: 'true' }
        })} 
      />

      <View style={styles.titleArea}>
        <View style={styles.checkCircle}>
          <Text style={{ fontSize: 24 }}>✅</Text>
        </View>
        <Text style={[styles.completeText, typography?.h1]}>기록완료!</Text>
        <Text style={[styles.descText, typography?.body1]}>
          {type} 혈당이 기록되었어요
        </Text>
      </View>

      <View style={styles.contentSheet}>
        <Card style={styles.resultCard}>
          <View style={styles.cardHeader}>
            <Text style={typography?.h3}>{type} 혈당</Text>
            <Text style={[styles.displayTimeText]}>{displayTime}</Text>
          </View>
          
          <View style={styles.valueRow}>
            <Text style={[styles.bigValue, { color: Colors.primary }]}>{numericValue.toFixed(1)}</Text>
            <Text style={styles.unitText}>mg/dL</Text>
            <View style={[styles.statusBadge, { backgroundColor: risk.bg, zIndex: 10 }]}>
                <Text style={[styles.statusText, { color: risk.color }]}>{risk.label}</Text>
            </View>
          </View>

          {/* 수치 바 */}
          <View style={styles.barContainer}>
            <View style={[styles.barBackground, { backgroundColor: Colors.gray }]}> 
              <View style={[styles.barFill, { width: `${progress}%`, backgroundColor: Colors.primary }]} />
            </View>
            <View style={styles.barLabelRow}>
              <Text style={styles.barLabel}>40</Text>
              <Text style={styles.barLabel}>80</Text>
              <Text style={styles.barLabel}>120</Text>
              <Text style={styles.barLabel}>160</Text>
              <Text style={styles.barLabel}>200</Text>
            </View>
          </View>
        </Card>

        <View style={styles.horizontalFooter}>
          <Button 
            title="홈으로" 
            onPress={() => router.replace('/(tabs)')} 
            variant="outline" 
            style={styles.flexButton} 
          />
          <Button 
            title="식단 추천 보기" 
            onPress={() => {}} 
            variant="primary" 
            style={styles.flexButton} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary },
  header: { marginTop: 40, paddingHorizontal: 20 },
  headerTitle: { color: Colors.white },
  backButton: { 
    alignSelf: 'flex-start',
    paddingVertical: 10, // 터치 영역 확보
  },
  titleArea: { alignItems: 'center', justifyContent: 'center', marginVertical: 30 },
  checkCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: 'rgba(233, 225, 234, 0.70)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  completeText: { color: Colors.white, textAlign: 'center' },
  descText: { color: Colors.white, marginTop: 8, textAlign: 'center' },
  contentSheet: { flex: 1, backgroundColor: Colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24 },
  resultCard: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  valueRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 15,
    minHeight: 60, 
},
  displayTimeText: {
    ...typography?.body2,
    color: Colors.gray,
    flex: 1,
    textAlign: 'right',
  },
  bigValue: { fontSize: 48, fontWeight: 'bold', opacity: 1, },
  unitText: { fontSize: 18, color: Colors.lightgray },
  statusBadge: {
    width: 64,
    height: 24,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  barContainer: { marginTop: 25 },
  barBackground: { 
    height: 12, 
    backgroundColor: Colors.gray,
    borderRadius: 6, 
    overflow: 'hidden' 
  },
  barFill: { height: '100%', borderRadius: 5, opacity: 1, },
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  barLabel: { fontSize: 12, color: Colors.gray },

  horizontalFooter: { 
    flexDirection: 'row', 
    gap: 12, 
    marginTop: 'auto', 
    paddingBottom: 20 
  },
  flexButton: { flex: 1 },
});

export default BloodSugarResult;