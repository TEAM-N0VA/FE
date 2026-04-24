import Button from '@/components/Button';
import SubHeader from '@/components/SubHeader';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { typography } from '@/constants/typography';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const BloodSugarInput = () => {
  const params = useLocalSearchParams();
  const { measuredAt, step, value, memo: prevMemo, fromResult } = params; 
  const [inputValue, setInputValue] = useState(value ? (value as string).split('.')[0] : '100');
  const [decimalValue, setDecimalValue] = useState(value ? (value as string).split('.')[1] : '0');
  const [memo, setMemo] = useState((prevMemo as string) || '');

  useFocusEffect(
    React.useCallback(() => {
      if (fromResult === 'true' && value) {
        // Result 화면에서 돌아온 경우에만 값 유지
        const parts = (value as string).split('.');
        setInputValue(parts[0]);
        setDecimalValue(parts[1] || '0');
        setMemo((prevMemo as string) || '');
      } else {
        // 그 외(Index에서 진입, 홈에서 진입 등)는 모두 초기화
        setInputValue('100');
        setDecimalValue('0');
        setMemo('');
      }
    }, [fromResult, value, prevMemo])
  );

  const handleInputChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setInputValue(numericText);
  };

  const handleDecimalChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setDecimalValue(numericText.slice(0, 1)); // 첫째 자리만 허용
  };

// ISO 문자열을 다시 Date 객체로 변환
const dateObj = measuredAt ? new Date(measuredAt as string) : new Date();
const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

const handleSave = () => {
  const bloodSugarValue = parseFloat(`${inputValue}.${decimalValue}`);
  
  if (bloodSugarValue < 40 || bloodSugarValue > 200) {
    Alert.alert("알림", "40.0에서 200.0 사이의 값만 입력 가능합니다.");
    return;
  }
  
  router.push({
    pathname: '/bloodsugar/result',
    params: { 
      measuredAt, 
      step, 
      value: bloodSugarValue.toFixed(1),
      memo: memo
    }
  });
};
  return (
    <View style={styles.container}>
      {/* 상단 헤더 (Index와 동일) */}
      <SubHeader 
        title="혈당 기록" 
        onBack={() => router.navigate({
          pathname: '/bloodsugar',
          params: { lastSelectedStep: step } 
        })} 
      />

      <View style={styles.questionContainer}>
        <Text style={[styles.questionText, typography?.h1]}>혈당 수치를 입력해주세요</Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      {/* 하단 화이트 시트 */}
      <View style={styles.contentSheet}>
        <ScrollView contentContainerStyle={styles.scrollContent}>          
          <View style={styles.inputContainer}>
            <View style={styles.row}>
                <TextInput
                style={styles.numericInput} // 색상을 검정색으로 설정
                value={inputValue}
                onChangeText={handleInputChange}
                keyboardType="number-pad"
                maxLength={3}
                />
                <Text style={styles.dot}>.</Text>
                {/* ✅ 소수점 첫째자리 입력 가능하게 수정 */}
                <TextInput
                    style={styles.decimalInput}
                    value={decimalValue}
                    onChangeText={handleDecimalChange}
                    keyboardType="number-pad"
                    maxLength={1}
                />
                <Text style={styles.unit}>mg/dL</Text>
            </View>
          </View>

          {/* 메모 입력창 */}
          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabel, typography?.body2]}>메모 (선택)</Text>
            <TextInput
              style={styles.memoInput}
              placeholder="특이사항이 있다면 적어주세요"
              placeholderTextColor={Colors.lightgray}
              value={memo}
              onChangeText={setMemo}
              multiline
            />
          </View>
        </ScrollView>

        {/* 저장 버튼 */}
        <View style={styles.footer}>
          <Button
            title="저장"
            onPress={handleSave}
            variant="primary"
            style={styles.saveButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.secondary },
  header: { height: 50, justifyContent: 'center', paddingHorizontal: 20, marginTop: 40 },
  headerTitle: { color: Colors.white },
  backButton: { alignSelf: 'flex-start' },
  questionContainer: { 
    paddingHorizontal: Layout.spacing.screenPadding, 
    paddingTop: 30,
    paddingBottom: 10,
},
  questionText: { color: Colors.white },
  contentSheet: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
  },
  scrollContent: { alignItems: 'center', paddingHorizontal: Layout.spacing.screenPadding },
  pickerWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wheel: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  wheelText: { ...typography?.h1, color: Colors.secondary },
  fixedDot: { ...typography?.h1, color: Colors.secondary, fontWeight: '700' },
  unitText: { ...typography?.h3, color: '#494145', marginLeft: 5 },
  inputWrapper: { width: '100%', marginTop: 20 },
  inputLabel: { color: '#8E8E8E', marginBottom: 8 },
  memoInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 15,
    textAlignVertical: 'top',
    ...typography?.body1,
  },
  footer: { padding: Layout.spacing.screenPadding, paddingBottom: 40 },
  saveButton: { width: '100%' },
  dateText: {
    ...typography?.body2,
    color: Colors.lightgray,
    textAlign: 'left',
    marginBottom: 10,     
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  numericInput: {
    fontSize: 60, // 크게 표시
    fontWeight: 'bold',
    color: '#000', // 검정색
    textAlign: 'right',
    minWidth: 100,
  },
  decimalInput: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#000', // ✅ 소수점도 Primary 색상
    textAlign: 'left',
    minWidth: 40,
  },
  dot: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  unit: {
    fontSize: 20,
    color: '#8E8E8E',
    marginLeft: 10,
  },
});

export default BloodSugarInput;