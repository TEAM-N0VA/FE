import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ResultScreen() {
  const { addedItems } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>분석 결과 화면</Text>
      <Text style={styles.content}>
        선택된 아이템 ID: {addedItems ? addedItems : '없음'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F7F7' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  content: { fontSize: 16, color: '#666' }
});