import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';

const PURPLE = '#926897';
const BG = '#F8F7F7';
const TEXT = '#494145';

function ProfileAvatar({ size = 114 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 135 135" fill="none">
      <Circle cx="67.5" cy="67.5" r="67.5" fill="#E9E1EA" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M90 50.625C90 56.5924 87.6295 62.3153 83.4099 66.5349C79.1903 70.7545 73.4674 73.125 67.5 73.125C61.5326 73.125 55.8097 70.7545 51.5901 66.5349C47.3705 62.3153 45 56.5924 45 50.625C45 44.6576 47.3705 38.9347 51.5901 34.7151C55.8097 30.4955 61.5326 28.125 67.5 28.125C73.4674 28.125 79.1903 30.4955 83.4099 34.7151C87.6295 38.9347 90 44.6576 90 50.625ZM78.75 50.625C78.75 53.6087 77.5647 56.4702 75.4549 58.5799C73.3452 60.6897 70.4837 61.875 67.5 61.875C64.5163 61.875 61.6548 60.6897 59.5451 58.5799C57.4353 56.4702 56.25 53.6087 56.25 50.625C56.25 47.6413 57.4353 44.7798 59.5451 42.67C61.6548 40.5603 64.5163 39.375 67.5 39.375C70.4837 39.375 73.3452 40.5603 75.4549 42.67C77.5647 44.7798 78.75 47.6413 78.75 50.625Z"
        fill={PURPLE}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M67.5 5.625C33.3281 5.625 5.625 33.3281 5.625 67.5C5.625 101.672 33.3281 129.375 67.5 129.375C101.672 129.375 129.375 101.672 129.375 67.5C129.375 33.3281 101.672 5.625 67.5 5.625ZM16.875 67.5C16.875 79.2562 20.8856 90.0788 27.6075 98.6738C32.3294 92.4757 38.4196 87.4527 45.403 83.9966C52.3863 80.5405 60.0739 78.745 67.8656 78.75C75.5571 78.741 83.1491 80.4887 90.0626 83.8596C96.9761 87.2306 103.028 92.1358 107.758 98.2012C112.632 91.809 115.913 84.3481 117.331 76.4358C118.749 68.5235 118.262 60.3874 115.912 52.7005C113.561 45.0137 109.413 37.9971 103.812 32.2315C98.2111 26.4658 91.3177 22.1167 83.7021 19.5441C76.0866 16.9715 67.968 16.2493 60.018 17.4373C52.0679 18.6254 44.5151 21.6894 37.9843 26.3759C31.4536 31.0625 26.1327 37.2368 22.4619 44.388C18.7911 51.5392 16.876 59.4617 16.875 67.5ZM67.5 118.125C55.8782 118.144 44.6071 114.146 35.595 106.808C39.2221 101.613 44.0505 97.3727 49.6692 94.4463C55.2879 91.5199 61.5305 89.9945 67.8656 90C74.1216 89.9945 80.2886 91.4819 85.8543 94.3386C91.42 97.1953 96.2236 101.339 99.8662 106.425C90.7845 114.002 79.3274 118.144 67.5 118.125Z"
        fill={PURPLE}
      />
    </Svg>
  );
}

const MENU_ITEMS = [
  {
    key: 'profile',
    label: '개인정보 수정',
    icon: 'person-circle-outline' as const,
    iconColor: PURPLE,
    iconBg: '#EEE9EF',
    onPress: () => router.push('/(tabs)/mypage/detail'),
  },
  {
    key: 'alarm',
    label: '알림 설정',
    icon: 'notifications-outline' as const,
    iconColor: '#E8A838',
    iconBg: '#FEF5E4',
    onPress: () => {},
  },
  {
    key: 'health',
    label: '혈당 및 체중 목표 설정',
    icon: 'fitness-outline' as const,
    iconColor: '#E07070',
    iconBg: '#FDEAEA',
    onPress: () => {},
  },
  {
    key: 'safeMenu',
    label: '나만의 안심 메뉴',
    icon: 'heart-outline' as const,
    iconColor: '#E05B7A',
    iconBg: '#FDEAEE',
    onPress: () => {},
  },
  {
    key: 'logout',
    label: '로그아웃',
    icon: 'log-out-outline' as const,
    iconColor: PURPLE,
    iconBg: '#EEE9EF',
    onPress: () => {},
  },
];

export default function MypageScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={24} color={TEXT} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar */}
        <View style={styles.avatarWrapper}>
          <ProfileAvatar size={114} />
          <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
            <Ionicons name="pencil-outline" size={14} color="#1C274C" />
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.menuRow,
                index < MENU_ITEMS.length - 1 && styles.menuRowBorder,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconWrap, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={26} color={item.iconColor} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={22} color={TEXT} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 10,
  },
  backBtn: {
    padding: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: TEXT,
    lineHeight: 24,
  },
  scrollContent: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  avatarWrapper: {
    marginTop: 24,
    marginBottom: 32,
    width: 134,
    height: 134,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 30,
    height: 30,
    borderRadius: 13,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EAE7E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuList: {
    width: '100%',
    paddingHorizontal: 24,
    gap: 0,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE9EF',
  },
  menuIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    letterSpacing: -0.3,
  },
});
