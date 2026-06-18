import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';

const PURPLE = '#926897';
const BG = '#F8F7F7';
const TEXT = '#494145';
const BLACK = '#000';
const GRAY = '#C8C1C4';

// ----- Mini profile avatar -----
function SmallAvatar() {
  return (
    <Svg width={65} height={65} viewBox="0 0 135 135" fill="none">
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

// ----- Reusable dropdown pill -----
type DropdownOption = { label: string; value: string };

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
  width?: number;
}

function Dropdown({ value, options, onChange, width }: DropdownProps) {
  const [visible, setVisible] = useState(false);
  const label = options.find((o) => o.value === value)?.label ?? value;

  return (
    <>
      <TouchableOpacity
        style={[styles.dropdown, width ? { width } : undefined]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>{label}</Text>
        <Ionicons name="chevron-down" size={18} color={TEXT} />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setVisible(false)}>
          <View style={styles.modalSheet}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.modalOption,
                  opt.value === value && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  onChange(opt.value);
                  setVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    opt.value === value && styles.modalOptionTextSelected,
                  ]}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

// ----- Date selector button -----
interface DateButtonProps {
  label: string;
  onPress: () => void;
}
function DateButton({ label, onPress }: DateButtonProps) {
  return (
    <TouchableOpacity style={styles.dateBtn} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.dateBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ----- Radio button -----
interface RadioProps {
  selected: boolean;
  onPress: () => void;
  label: string;
}
function Radio({ selected, onPress, label }: RadioProps) {
  return (
    <TouchableOpacity style={styles.radioRow} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.radioCircle, selected && styles.radioCircleSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ----- Allergen options -----
const ALLERGEN_OPTIONS: DropdownOption[] = [
  { label: '-', value: '-' },
  { label: '콩', value: '콩' },
  { label: '밀', value: '밀' },
  { label: '계란', value: '계란' },
  { label: '우유', value: '우유' },
  { label: '견과류', value: '견과류' },
  { label: '갑각류', value: '갑각류' },
];

const WEIGHT_OPTIONS: DropdownOption[] = Array.from({ length: 71 }, (_, i) => ({
  label: `${i + 30} kg`,
  value: `${i + 30}`,
}));

const ACTIVITY_OPTIONS: DropdownOption[] = [
  { label: '적음', value: 'low' },
  { label: '보통', value: 'medium' },
  { label: '많음', value: 'high' },
];

export default function MypageDetailScreen() {
  const insets = useSafeAreaInsets();

  const [pwChange, setPwChange] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [birthday, setBirthday] = useState('1995. 12. 20');
  const [dueDate, setDueDate] = useState('2026. 7. 10');
  const [preWeight, setPreWeight] = useState('55');
  const [currentWeight, setCurrentWeight] = useState('62');
  const [activity, setActivity] = useState('low');
  const [allergen1, setAllergen1] = useState('콩');
  const [allergen2, setAllergen2] = useState('-');
  const [allergen3, setAllergen3] = useState('-');
  const [locationConsent, setLocationConsent] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Profile header row */}
        <View style={styles.profileHeader}>
          <SmallAvatar />
          <Text style={styles.profileName}>김지윤 산모님</Text>
        </View>

        {/* ── 가입정보 ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>가입정보</Text>

          <View style={styles.sectionBody}>
            {/* 이름 */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>이름</Text>
              <Text style={styles.fieldValue}>김지윤</Text>
            </View>

            {/* ID */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>ID</Text>
              <Text style={styles.fieldValue}>mealdang123</Text>
            </View>

            {/* PW 변경 */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>PW 변경</Text>
              <TextInput
                style={styles.pwInput}
                value={pwChange}
                onChangeText={setPwChange}
                secureTextEntry
                placeholder="________________"
                placeholderTextColor={BLACK}
              />
            </View>

            {/* PW 확인 */}
            <View style={[styles.formRow, { flexWrap: 'wrap', gap: 8 }]}>
              <Text style={styles.fieldLabel}>PW 확인</Text>
              <TextInput
                style={styles.pwInput}
                value={pwConfirm}
                onChangeText={setPwConfirm}
                secureTextEntry
                placeholder="________________"
                placeholderTextColor={BLACK}
              />
              <TouchableOpacity style={styles.pwChangeBtn} activeOpacity={0.8}>
                <Text style={styles.pwChangeBtnText}>비밀번호 변경</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── 프로필 ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>프로필</Text>

          <View style={styles.sectionBody}>
            {/* 생년월일 */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>생년월일</Text>
              <Text style={[styles.fieldValue, { flex: 1 }]}>{birthday}</Text>
              <DateButton label="날짜 선택" onPress={() => {}} />
            </View>

            {/* 출산 예정일 */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>출산 예정일</Text>
              <Text style={[styles.fieldValue, { flex: 1 }]}>{dueDate}</Text>
              <DateButton label="날짜 선택" onPress={() => {}} />
            </View>

            {/* 임신 전 체중 */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>임신 전 체중</Text>
              <Dropdown
                value={preWeight}
                options={WEIGHT_OPTIONS}
                onChange={setPreWeight}
              />
            </View>

            {/* 현재 체중 */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>현재 체중</Text>
              <Dropdown
                value={currentWeight}
                options={WEIGHT_OPTIONS}
                onChange={setCurrentWeight}
              />
            </View>

            {/* 평소 활동량 */}
            <View style={styles.formRow}>
              <Text style={styles.fieldLabel}>평소 활동량</Text>
              <Dropdown
                value={activity}
                options={ACTIVITY_OPTIONS}
                onChange={setActivity}
              />
            </View>

            {/* 알레르기 및 기피 식재료 */}
            <View style={styles.allergenBlock}>
              <Text style={styles.fieldLabel}>알레르기 및 기피 식재료</Text>
              <View style={styles.allergenRow}>
                <Dropdown
                  value={allergen1}
                  options={ALLERGEN_OPTIONS}
                  onChange={setAllergen1}
                  width={90}
                />
                <Dropdown
                  value={allergen2}
                  options={ALLERGEN_OPTIONS}
                  onChange={setAllergen2}
                  width={90}
                />
                <Dropdown
                  value={allergen3}
                  options={ALLERGEN_OPTIONS}
                  onChange={setAllergen3}
                  width={90}
                />
              </View>
            </View>
          </View>
        </View>

        {/* ── 설정 ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설정</Text>

          <View style={styles.sectionBody}>
            <View style={[styles.formRow, { flexWrap: 'wrap' }]}>
              <Text style={[styles.fieldLabel, { flex: 1 }]}>위치정보 제공 동의</Text>
              <View style={styles.radioGroup}>
                <Radio
                  selected={locationConsent}
                  onPress={() => setLocationConsent(true)}
                  label="동의"
                />
                <Radio
                  selected={!locationConsent}
                  onPress={() => setLocationConsent(false)}
                  label="미동의"
                />
              </View>
            </View>
          </View>
        </View>

        {/* ── 수정하기 button ── */}
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>수정하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingBottom: 40,
  },

  // Profile header
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  profileName: {
    fontSize: 25,
    fontWeight: '600',
    color: TEXT,
  },

  // Sections
  section: {
    marginBottom: 20,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '600',
    color: PURPLE,
    lineHeight: 34,
  },
  sectionBody: {
    paddingHorizontal: 8,
    gap: 8,
  },

  // Form rows
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 4,
  },
  fieldLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: BLACK,
    lineHeight: 25,
    minWidth: 80,
  },
  fieldValue: {
    fontSize: 17,
    fontWeight: '400',
    color: BLACK,
    lineHeight: 25,
  },

  // PW inputs
  pwInput: {
    fontSize: 17,
    color: BLACK,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingVertical: 2,
    minWidth: 120,
  },
  pwChangeBtn: {
    paddingHorizontal: 8,
    height: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GRAY,
    backgroundColor: BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pwChangeBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: TEXT,
    lineHeight: 16,
  },

  // Date button
  dateBtn: {
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateBtnText: {
    fontSize: 13,
    color: TEXT,
    fontWeight: '500',
  },

  // Dropdown
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 38,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2F2F2F',
    minWidth: 90,
  },
  dropdownText: {
    fontSize: 17,
    color: TEXT,
    fontWeight: '400',
  },

  // Allergen
  allergenBlock: {
    gap: 8,
    paddingVertical: 4,
  },
  allergenRow: {
    flexDirection: 'row',
    gap: 12,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 12,
    maxHeight: 320,
  },
  modalOption: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  modalOptionSelected: {
    backgroundColor: '#EEE9EF',
  },
  modalOptionText: {
    fontSize: 16,
    color: BLACK,
  },
  modalOptionTextSelected: {
    color: PURPLE,
    fontWeight: '600',
  },

  // Radio
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GRAY,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: BG,
  },
  radioLabel: {
    fontSize: 13,
    color: TEXT,
    lineHeight: 16,
  },

  // Submit button
  submitBtn: {
    marginTop: 24,
    backgroundColor: PURPLE,
    borderRadius: 12,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
});
