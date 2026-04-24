// components/SubHeader.tsx
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { typography } from '@/constants/typography';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SubHeaderProps {
  title: string;
  onBack: () => void;
}

const SubHeader = ({ title, onBack }: SubHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        {/* 〈 기호와 타이틀 사이의 일관된 간격 유지 */}
        <Text style={[styles.headerTitle, typography?.h3]}>〈 {title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    justifyContent: 'center',
    // ✅ 모든 화면의 여백을 여기서 통일합니다.
    paddingHorizontal: Layout.spacing.screenPadding, 
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  headerTitle: {
    color: Colors.white,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10, 
  },
});

export default SubHeader;