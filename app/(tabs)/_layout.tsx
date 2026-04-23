import DateTimePicker from '@react-native-community/datetimepicker';
import { router, Tabs } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

import { postBloodSugar } from '@/services/api';

const PRIMARY = '#926897';
const GRAY = '#C8C1C4';
const getFormattedDate = (date: Date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${days[date.getDay()]}`;
};

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.2541 0.288309C11.6805 -0.0961031 12.3272 -0.0961031 12.7537 0.288309L23.6259 10.0393C24.0898 10.4518 24.1273 11.1644 23.7102 11.6285C23.2931 12.0926 22.5855 12.1301 22.1216 11.7129L21.7467 11.3753V20.9997C21.7467 22.6546 20.4017 24 18.7474 24H5.25094C3.59668 24 2.25171 22.6546 2.25171 20.9997V11.3753L1.87681 11.7129C1.41287 12.1254 0.705239 12.0879 0.28816 11.6285C-0.12892 11.1691 -0.0867428 10.4565 0.372513 10.0393L11.2541 0.288309ZM12.0039 2.63698L4.50582 9.3642V21.0044C4.50582 21.4169 4.84323 21.7545 5.25562 21.7545H7.50504V16.879C7.50504 15.0132 9.01402 13.5037 10.8792 13.5037H13.1286C14.9937 13.5037 16.5027 15.0132 16.5027 16.879V21.7545H18.7521C19.1645 21.7545 19.5019 21.4169 19.5019 21.0044V9.3642L12.0039 2.64166V2.63698ZM9.75446 21.7545H14.2533V16.879C14.2533 16.2555 13.7519 15.7539 13.1286 15.7539H10.8792C10.2559 15.7539 9.75446 16.2555 9.75446 16.879V21.7545Z"
        fill={color}
      />
    </Svg>
  );
}

function DietIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M1.51213 8.32328V8.30597C1.51263 6.66515 1.97305 5.06122 2.83536 3.69643C3.69766 2.33163 4.92323 1.26708 6.35753 0.637003C7.79183 0.00692647 9.37064 -0.160461 10.8949 0.155947C12.4191 0.472355 13.8205 1.25839 14.9224 2.41494C15.7895 1.96246 16.758 1.77205 17.7211 1.86474C18.6842 1.95744 19.6043 2.32964 20.3796 2.9402C21.1549 3.55076 21.7553 4.37589 22.1143 5.32437C22.4734 6.27285 22.5772 7.30774 22.4142 8.31462C22.6532 8.33815 22.8851 8.41343 23.0954 8.53578C23.3057 8.65813 23.4898 8.82492 23.6364 9.02575C23.783 9.22659 23.8888 9.45717 23.9473 9.70311C24.0058 9.94905 24.0157 10.2051 23.9764 10.4552C23.1862 15.475 21.2334 18.6533 18.118 19.9899V21.2305C18.118 21.965 17.8417 22.6694 17.35 23.1888C16.8583 23.7082 16.1914 24 15.496 24H8.50406C7.80867 24 7.14176 23.7082 6.65004 23.1888C6.15833 22.6694 5.88209 21.965 5.88209 21.2305V19.9899C2.76849 18.6533 0.815672 15.475 0.0236182 10.4552C-0.0146936 10.2116 -0.00632745 9.96226 0.0482213 9.72206C0.10277 9.48187 0.202392 9.25567 0.34119 9.05688C0.479987 8.85808 0.655136 8.69073 0.856268 8.56472C1.0574 8.43871 1.28042 8.35661 1.51213 8.32328ZM3.26011 8.30597H5.0081C5.0081 7.08176 5.4685 5.90769 6.28803 5.04204C7.10755 4.17639 8.21906 3.69008 9.37805 3.69008C10.537 3.69008 11.6485 4.17639 12.4681 5.04204C13.2876 5.90769 13.748 7.08176 13.748 8.30597H15.496C15.496 6.59208 14.8514 4.94838 13.7041 3.73647C12.5567 2.52456 11.0006 1.84372 9.37805 1.84372C7.75547 1.84372 6.19935 2.52456 5.05202 3.73647C3.90468 4.94838 3.26011 6.59208 3.26011 8.30597ZM6.75608 8.30597H12C12 7.57144 11.7238 6.867 11.2321 6.34761C10.7403 5.82822 10.0734 5.53644 9.37805 5.53644C8.68266 5.53644 8.01575 5.82822 7.52403 6.34761C7.03232 6.867 6.75608 7.57144 6.75608 8.30597ZM18.7571 8.30597H20.6307C20.7624 7.76026 20.7745 7.19 20.6661 6.6386C20.5576 6.08721 20.3315 5.56922 20.0049 5.12408C19.6783 4.67895 19.2598 4.3184 18.7814 4.0699C18.3029 3.8214 17.7771 3.69149 17.244 3.69008C16.8389 3.68932 16.4368 3.76353 16.0559 3.90933C16.3671 4.43859 16.6217 5.00268 16.8152 5.59125C17.1482 5.50356 17.4983 5.52122 17.822 5.64204C18.1456 5.76286 18.4285 5.9815 18.6354 6.27078C18.8423 6.56006 18.9642 6.90721 18.9858 7.26906C19.0075 7.63091 18.9279 7.9915 18.7571 8.30597ZM16.37 20.3073H7.63007V21.2305C7.63007 21.4753 7.72215 21.7101 7.88605 21.8833C8.04996 22.0564 8.27226 22.1536 8.50406 22.1536H15.496C15.7278 22.1536 15.9501 22.0564 16.114 21.8833C16.2779 21.7101 16.37 21.4753 16.37 21.2305V20.3073ZM7.01554 18.4609H16.9845C19.7567 17.5204 21.5129 14.8548 22.2558 10.1523H1.74429C2.48718 14.8548 4.24335 17.5204 7.01554 18.4609Z"
        fill={color}
      />
    </Svg>
  );
}

function RestaurantIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.84846 3H21.1515C21.8706 3 22.4589 2.325 22.4589 1.5C22.4589 0.675 21.8706 0 21.1515 0H2.84846C2.12941 0 1.5411 0.675 1.5411 1.5C1.5411 2.325 2.12941 3 2.84846 3ZM22.6681 5.7C22.5504 5.01 22.0144 4.5 21.3869 4.5H2.61314C1.9856 4.5 1.44958 5.01 1.33192 5.7L0.0245582 13.2C-0.132325 14.13 0.482135 15 1.30577 15H1.5411V22.5C1.5411 23.325 2.12941 24 2.84846 24H13.3074C14.0264 24 14.6147 23.325 14.6147 22.5V15H19.8442V22.5C19.8442 23.325 20.4325 24 21.1515 24C21.8706 24 22.4589 23.325 22.4589 22.5V15H22.6942C23.5179 15 24.1323 14.13 23.9754 13.2L22.6681 5.7ZM12 21H4.15582V15H12V21Z"
        fill={color}
      />
    </Svg>
  );
}

function MypageIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.1256 13.0387C19.0973 13.8961 20.7785 15.2317 21.9889 16.9023C23.1993 18.5729 23.8933 20.5155 23.9965 22.5218C24.0102 22.7055 23.9839 22.89 23.9193 23.0643C23.8546 23.2386 23.7527 23.3993 23.6197 23.5368C23.4867 23.6744 23.3252 23.7861 23.1447 23.8653C22.9642 23.9446 22.7683 23.9899 22.5686 23.9985C22.3688 24.0071 22.1692 23.9788 21.9815 23.9154C21.7938 23.852 21.6217 23.7547 21.4753 23.6291C21.329 23.5036 21.2113 23.3524 21.1292 23.1844C21.0472 23.0164 21.0024 22.835 20.9975 22.6509C20.8883 20.5199 19.8925 18.5095 18.2169 17.037C16.5412 15.5644 14.3143 14.7429 11.9985 14.7429C9.68262 14.7429 7.45573 15.5644 5.78004 17.037C4.10436 18.5095 3.10859 20.5199 2.99945 22.6509C2.97249 23.0116 2.79327 23.3482 2.50019 23.5887C2.20712 23.8292 1.82347 23.9544 1.43141 23.9375C1.03936 23.9206 0.670061 23.763 0.402604 23.4984C0.135146 23.2338 -0.00920735 22.8832 0.000455652 22.5218C0.103418 20.5157 0.797107 18.5732 2.00716 16.9026C3.21721 15.2321 4.89799 13.8963 6.86933 13.0387C5.60609 12.068 4.69808 10.7625 4.26883 9.29963C3.83957 7.83676 3.9099 6.2876 4.47026 4.86286C5.03061 3.43812 6.05377 2.20697 7.40058 1.33688C8.74739 0.466793 10.3525 0 11.9975 0C13.6424 0 15.2475 0.466793 16.5943 1.33688C17.9411 2.20697 18.9643 3.43812 19.5247 4.86286C20.085 6.2876 20.1553 7.83676 19.7261 9.29963C19.2968 10.7625 18.3888 12.068 17.1256 13.0387ZM17.0035 7.37133C17.0035 6.14853 16.4761 4.9758 15.5375 4.11115C14.5989 3.24649 13.3259 2.76073 11.9985 2.76073C10.671 2.76073 9.398 3.24649 8.45938 4.11115C7.52076 4.9758 6.99345 6.14853 6.99345 7.37133C6.99345 8.59414 7.52076 9.76687 8.45938 10.6315C9.398 11.4962 10.671 11.9819 11.9985 11.9819C13.3259 11.9819 14.5989 11.4962 15.5375 10.6315C16.4761 9.76687 17.0035 8.59414 17.0035 7.37133Z"
        fill={color}
      />
    </Svg>
  );
}

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

function CustomTabBar({ state, descriptors, navigation }: TabBarProps) {
  const [tempDate, setTempDate] = useState(new Date()); // 팝업 내에서 조절할 날짜
  const [showDatePicker, setShowDatePicker] = useState(false); // 달력 표시 여부
  const [showTimePicker, setShowTimePicker] = useState(false); // 시간 전용 상태

  
  // ─── 팝업 관련 상태 관리 ───
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState<'select' | 'blood' | 'diet'>('select');

  // ─── 데이터 입력 상태 ───
  const [bloodData, setBloodData] = useState({ date: new Date().toISOString(), time: '', value: '' });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const closeModal = () => {
    setModalVisible(false);
    setStep('select');
    setTempDate(new Date()); // 닫을 때 날짜 초기화
  };

  const handleApply = () => {
    const hours = tempDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const minutes = String(tempDate.getMinutes()).padStart(2, '0'); 
    const displayTime = `${hour12}:${minutes} ${ampm}`;

    setBloodData({
      ...bloodData,
      date: tempDate.toISOString().split('T')[0],
      time: displayTime,
    });
    
    const targetPath = step === 'blood' ? '/(tabs)/bloodsugar' : '/dietlog';

    closeModal();
    router.push(targetPath); // 이동
  };

  const handleBloodSubmit = async () => {
    if (!bloodData.value || !bloodData.date || !bloodData.time) {
    Alert.alert("알림", "모든 정보를 입력해주세요.");
    return;
  }
   try {
    // 1. 서버 규격에 맞게 데이터 가공 (YYYY-MM-DD HH:mm:00)
    const formattedDateTime = `${bloodData.date} ${bloodData.time}:00`;

    // 2. API 호출
    await postBloodSugar({
      user_id: 12, // 임시 유저 ID
      measured_at: formattedDateTime,
      value: parseInt(bloodData.value),
      recorded_type: "POST_MEAL_2H", // 일단 하드코딩, 나중에 선택 기능 추가 가능
      // meal_log_id: 505, // 필요 시 추가
    });

    Alert.alert("성공", "혈당 기록이 저장되었습니다.");
    closeModal();
  } catch (e) {
    Alert.alert("오류", "전송에 실패했습니다. 서버 상태를 확인하세요.");
  }
  };

 

  const tabs = [
    { name: 'index', label: '홈', Icon: HomeIcon },
    { name: 'dietrecommend/index', label: '식단추천', Icon: DietIcon },
    { name: 'restaurant/index', label: '식당안내', Icon: RestaurantIcon },
    { name: 'mypage/index', label: '마이페이지', Icon: MypageIcon },
  ];

  return (
    <View style={styles.tabBarWrapper}>
      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            
            {/* Step 1: 선택 화면 */}
            {step === 'select' && (
              <View style={styles.stepContainer}>
                <Text style={styles.modalTitle}>기록할 항목을 선택하세요</Text>
                <TouchableOpacity style={styles.modalButton} onPress={() => setStep('diet')}>
                  <Text style={styles.buttonText}>🥗 식단 기록하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={() => setStep('blood')}>
                  <Text style={styles.buttonText}>🩸 혈당 기록하기</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step 2-A: 혈당 기록 화면 */}
            {(step === 'blood' || step === 'diet') && (
              <View style={styles.stepContainer}>
                <Text style={styles.modalTitle}>
                  {step === 'blood' ? '혈당 기록 시간' : '식사 시간'} 선택
                </Text>
                
                <View style={styles.dateTimeConfigContainer}>
                  {/* 날짜 표시 및 연필 아이콘 */}
                  <View style={styles.dateRow}>
                    <Text style={styles.dateLabelText}>{getFormattedDate(tempDate)}</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <Text style={{fontSize: 18}}>✏️</Text>
                    </TouchableOpacity>
                  </View>

                  {/* 스크롤 방식 시간 선택기 (iOS는 기본 스크롤, Android는 설정 필요) */}
                  <View style={styles.inlineWheelContainer}>
                    <View style={styles.wheelWrapper}>
                      <ScrollPicker
                        dataSource={['오전', '오후']}
                        selectedIndex={tempDate.getHours() < 12 ? 0 : 1}
                        renderItem={(data) => <Text style={styles.wheelText}>{data}</Text>}
                        onValueChange={(data) => {
                          if (!data) return;
                          const newDate = new Date(tempDate);
                          const currentHours = newDate.getHours();
                          if (data === '오후' && currentHours < 12) newDate.setHours(currentHours + 12);
                          if (data === '오전' && currentHours >= 12) newDate.setHours(currentHours - 12);
                          setTempDate(newDate);
                        }}
                        wrapperHeight={150}
                        itemHeight={50}
                        highlightColor={PRIMARY}
                        highlightBorderWidth={2}
                        wrapperBackground="#F8F9FA"
                      />
                    </View>
                    {/* 시(Hour) 휠 */}
                    <ScrollPicker
                      dataSource={Array.from({ length: 12 }, (_, i) => `${i + 1}`)}
                      selectedIndex={(tempDate.getHours() % 12 || 12) - 1}
                      renderItem={(data) => <Text style={styles.wheelText}>{data}</Text>}
                      onValueChange={(data) => {
                        if (!data) return;
                        const newDate = new Date(tempDate);
                        const isPM = newDate.getHours() >= 12;
                        let hour = parseInt(data);
                        if (isPM && hour < 12) hour += 12;
                        if (!isPM && hour === 12) hour = 0;
                        newDate.setHours(hour);
                        setTempDate(newDate);
                      }}
                      wrapperHeight={150}
                      wrapperBackground="#FFFFFF"
                      itemHeight={50}
                      highlightColor="#926897"
                      highlightBorderWidth={2}
                    />

                    <View style={styles.separatorContainer}>
                      <Text style={styles.separatorText}>:</Text>
                    </View>

                    {/* 분(Minute) 휠 */}
                    <ScrollPicker
                      dataSource={Array.from({ length: 60 }, (_, i) => i < 10 ? `0${i}` : `${i}`)}
                      selectedIndex={tempDate.getMinutes()}
                      renderItem={(data) => <Text style={styles.wheelText}>{data}</Text>}
                      onValueChange={(data) => {
                        if (!data) return;
                        const newDate = new Date(tempDate);
                        newDate.setMinutes(parseInt(data));
                        setTempDate(newDate);
                      }}
                      wrapperHeight={150}
                      wrapperBackground="#FFFFFF"
                      itemHeight={50}
                      highlightColor="#926897"
                      highlightBorderWidth={2}
                    />
                  </View>


                  {/* 취소 / 적용 버튼 (시간용) */}
                  <View style={styles.modalActionRow}>
                    <TouchableOpacity style={styles.subButton} onPress={() => setStep('select')}>
                      <Text style={styles.subButtonText}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.subButton, {backgroundColor: PRIMARY}]} 
                      onPress={handleApply}
                    >
                      <Text style={[styles.subButtonText, {color: '#FFF'}]}>적용</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 달력 팝업 (연필 눌렀을 때만 뜸) */}
                {showDatePicker && (
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setTempDate(selectedDate);
                    }}
                  />
              )}

            </View>
          )}

          </Pressable>
        </Pressable>
      </Modal>

      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          const route = state.routes.find((r: any) => r.name === tab.name);
          const isFocused = route ? state.index === state.routes.indexOf(route) : false;
          const color = isFocused ? PRIMARY : GRAY;

          const onPress = () => {
            if (route) {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(tab.name);
              }
            }
          };

          // Insert FAB before restaurant tab
          if (tab.name === 'restaurant/index') {
            return (
              <React.Fragment key="fab-group">
                <TouchableOpacity 
                  style={styles.fabContainer} 
                  activeOpacity={0.8}
                  onPress={() => setModalVisible(true)}
                >
                  <View style={styles.fab}>
                    <Text style={styles.fabPlus}>+</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
                  <tab.Icon color={color} />
                  <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          }

          return (
            <TouchableOpacity key={tab.name} style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
              <tab.Icon color={color} />
              <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    backgroundColor: '#F8F7F7',
    paddingTop: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    height: 56,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 26,
    backgroundColor: '#926897',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  fabPlus: {
    color: '#FAF9FA',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 28,
  },
  indicator: {
    height: 5,
    marginHorizontal: 129,
    borderRadius: 100,
    backgroundColor: '#B9C0C9',
    marginBottom: 8,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 370,
    height: 438,
    padding: 16,
    borderRadius: 15,
    backgroundColor: '#F8F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 36,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#494145',
    marginBottom: 10,
  },
  modalButton: {
    width: 300,
    height: 60, // padding 고려한 높이
    backgroundColor: '#FFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0DCDE',
    // shadow 등 추가
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#494145',
  },
  dateTimeConfigContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  dateLabelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#494145',
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  subButton: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E0DCDE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  
  inlineWheelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
wheelWrapper: {
    flex: 1, 
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
wheelText: {
  fontSize: 18,
  fontWeight: '600',
  color: '#494145',
  textAlign: 'center',
  width: '100%',
  height: 50, 
  lineHeight: 50,
},
separatorContainer: {
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderTopWidth: 2, 
    borderBottomWidth: 2,
    borderTopColor: '#926897', // PRIMARY 색상
    borderBottomColor: '#926897',
  },
  separatorText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#494145',
    marginBottom: 4,
  },
});

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="dietrecommend/index" />
      <Tabs.Screen name="restaurant/index" />
      <Tabs.Screen name="mypage/index" />
    </Tabs>
  );
}
