import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ServingSizeSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onUpdate: (id: string, count: number) => void;
  foodItem: {
    id: string;
    name: string;
    kcal: number;
  } | null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ServingSizeSheet({ isVisible, onClose, onUpdate, foodItem }: ServingSizeSheetProps) {
  const [count, setCount] = useState(1);

  // 시트가 열릴 때마다 수량을 1로 초기화
  useEffect(() => {
    if (isVisible) setCount(1);
  }, [isVisible]);

  if (!foodItem) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheetContainer}>
          {/* 핸들 바 */}
          <View style={styles.handle} />
          
          <View style={styles.contentWrapper}>
            {/* 2. 타이틀 영역 */}
            <View style={styles.titleSection}>
              <Text style={styles.sheetTitle}>{foodItem.name} 양 수정</Text>
            </View>
          
          <View style={styles.counterRow}>
            <TouchableOpacity 
              style={styles.circleBtn} 
              onPress={() => setCount(Math.max(0.5, count - 0.5))}
            >
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>

            <View style={styles.valueBox}>
              <Text style={styles.countText}>{count}인분</Text>
              <Text style={styles.kcalText}>{Math.round(foodItem.kcal * count)} kcal</Text>
            </View>

            <TouchableOpacity 
              style={styles.circleBtn} 
              onPress={() => setCount(count + 0.5)}
            >
              <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.submitBtn} 
            onPress={() => {
              onUpdate(foodItem.id, count);
              onClose();
            }}
          >
            <Text style={styles.submitBtnText}>수정하기</Text>
          </TouchableOpacity>
        </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    width: SCREEN_WIDTH,
    // 피그마 속성 반영: 둥근 모서리 상단만 32px
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#F8F7F7',
    paddingTop: 12,
    paddingBottom: 40, // 65px padding 하단 여백 보정
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0DCDE',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  contentWrapper: {
    width: 350, // 제공해주신 width 반영
    alignItems: 'center',
    gap: 16, // 제공해주신 gap 반영
  },
  titleSection: {
    alignSelf: 'stretch',
    paddingVertical: 16,
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#494145',
  },
  counterRow: {
    width: 350, // 제공해주신 width 350px
    height: 80, // 제공해주신 height 80px
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40, // padding 41px 42px 보정
    backgroundColor: '#FFF',
    borderRadius: 16,
    // 그림자 추가
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#926897',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: { fontSize: 24, color: '#926897', fontWeight: '500' },
  valueBox: { alignItems: 'center', minWidth: 100 },
  countText: { fontSize: 22, fontWeight: '700', color: '#2E292B' },
  kcalText: { fontSize: 14, color: '#988B91', marginTop: 4 },
  submitBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#926897',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});