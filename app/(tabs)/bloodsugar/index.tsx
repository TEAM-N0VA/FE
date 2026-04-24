import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { typography } from '../../../constants/typography';

// 혈당 측정 시점 옵션 타입
type MeasurementStep = '공복' | '식사 전' | '식후 1시간' | '식후 2시간' | '취침 전';

const BloodSugarIndex = () => {
  const [selectedStep, setSelectedStep] = useState<MeasurementStep | null>(null);

  const steps: MeasurementStep[] = ['공복', '식사 전', '식후 1시간', '식후 2시간', '취침 전'];

  return (
    <View style={styles.container}>
      {/* 1. 상단 헤더 영역 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.headerTitle}>〈 혈당 기록</Text>
        </TouchableOpacity>
      </View>

      {/* 2. 상단 질문 영역 (Secondary 배경 위) */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>언제 측정했나요?</Text>
        <Text style={styles.subQuestionText}>측정 시간을 선택해주세요</Text>
      </View>

      {/* 3. 하단 화이트 시트 영역 (위쪽만 둥근 형태) */}
      <View style={styles.contentSheet}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.buttonGroup}>
            {steps.map((step) => (
              <TouchableOpacity
                key={step}
                style={[
                  styles.stepButton,
                  selectedStep === step && styles.stepButtonSelected,
                ]}
                onPress={() => setSelectedStep(step)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.stepButtonText,
                    selectedStep === step && styles.stepButtonTextSelected,
                  ]}
                >
                  {step}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* 4. 다음 버튼 영역 */}
        <View style={styles.footer}>
          <Button
            title="다음 →"
            onPress={() => router.push('/bloodsugar/input')} // 다음 입력 페이지로 이동
            disabled={!selectedStep}
            variant="primary"
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary, // 전체 배경을 보라색으로 설정
  },
  header: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 40, // 상태바 영역 고려
  },
  headerTitle: {
    ...typography.h3,
    color: Colors.white,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  questionContainer: {
    paddingHorizontal: Layout.spacing.screenPadding,
    paddingVertical: 30,
    gap: 8,
  },
  questionText: {
    ...typography.h1,
    color: Colors.white,
  },
  subQuestionText: {
    ...typography.body1,
    color: Colors.white,
    opacity: 0.9,
  },
  contentSheet: {
    flex: 1,
    backgroundColor: Colors.white, // 하단은 메뉴바와 같은 밝은 배경색
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  buttonGroup: {
    width: 290, // 피그마 너비 반영
    gap: 12,
  },
  stepButton: {
    width: 290,
    height: 60, // 피그마 height: 100px은 너무 커서 60으로 조정 (필요시 수정)
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0DCDE', // LightGray
    backgroundColor: '#FFFFFF',
  },
  stepButtonSelected: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  stepButtonText: {
    ...typography.h3,
    color: '#494145',
  },
  stepButtonTextSelected: {
    color: Colors.white,
  },
  footer: {
    padding: Layout.spacing.screenPadding,
    paddingBottom: 40,
  },
  nextButton: {
    width: '100%',
  },
});

export default BloodSugarIndex;