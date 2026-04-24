import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { typography } from '@/constants/typography';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BloodSugarInput = () => {
  const { measuredAt, step } = useLocalSearchParams();
  const [inputValue, setInputValue] = useState('120'); // 정수부
  const [decimalValue] = useState('0'); // 소수점 고정
  const [memo, setMemo] = useState('');

  const handleInputChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setInputValue(numericText);
  };

// ISO 문자열을 다시 Date 객체로 변환
const dateObj = new Date(measuredAt as string);
const formattedDate = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일 ${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/bloodsugar')} style={styles.backButton}>
          <Text style={[styles.headerTitle, typography?.h3]}>〈 혈당 기록</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.questionContainer}>
        <Text style={[styles.questionText, typography?.h1]}>혈당 수치를 입력해주세요</Text>
      </View>

      {/* 하단 화이트 시트 */}
      <View style={styles.contentSheet}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.dateText}>{formattedDate}</Text>
          
          <View style={styles.inputContainer}>
            <View style={styles.row}>
                <TextInput
                style={styles.numericInput} // 색상을 검정색으로 설정
                value={inputValue}
                onChangeText={handleInputChange}
                keyboardType="number-pad"
                maxLength={3}
                />
                <Text style={styles.dot}>.{decimalValue}</Text>
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
  questionContainer: { paddingHorizontal: Layout.spacing.screenPadding, paddingVertical: 30 },
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
    textAlign: 'center',
    marginTop: -10,     
    marginBottom: 20,
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