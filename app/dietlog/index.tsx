import { Colors } from '@/constants/Colors';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function ArrowLeftIcon({ color = '#F8F7F7' }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19.92L8.48 13.4C7.71 12.63 7.71 11.37 8.48 10.6L15 4.08"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function GalleryIcon() {
  return (
    <Svg width={31} height={30} viewBox="0 0 31 30" fill="none">
      <Path
        d="M11.34 8.67C10.81 8.67 10.29 8.88 9.91 9.26C9.54 9.64 9.32 10.16 9.32 10.7C9.32 11.24 9.54 11.76 9.91 12.14C10.29 12.52 10.81 12.73 11.34 12.73H11.35C11.89 12.73 12.4 12.52 12.78 12.14C13.15 11.76 13.37 11.24 13.37 10.7C13.37 10.16 13.15 9.64 12.78 9.26C12.4 8.88 11.89 8.67 11.35 8.67H11.34Z"
        fill={Colors.secondary}
      />
      <Path
        d="M4.65 6.875C4.65 6.129 4.94 5.414 5.47 4.886C5.99 4.359 6.7 4.063 7.44 4.063H23.56C24.3 4.063 25.01 4.359 25.53 4.886C26.06 5.414 26.35 6.129 26.35 6.875V23.125C26.35 23.871 26.06 24.586 25.53 25.114C25.01 25.641 24.3 25.938 23.56 25.938H7.44C6.7 25.938 5.99 25.641 5.47 25.114C4.94 24.586 4.65 23.871 4.65 23.125V6.875Z"
        stroke={Colors.secondary}
        strokeWidth={1.5}
        fill="none"
      />
    </Svg>
  );
}

function SearchIcon({ color = Colors.secondary }: { color?: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 21L16.657 16.657M16.657 16.657C17.4 15.914 17.989 15.032 18.391 14.062C18.793 13.091 19 12.051 19 11C19 9.949 18.793 8.909 18.391 7.938C17.989 6.968 17.4 6.086 16.657 5.343C15.914 4.6 15.032 4.011 14.062 3.609C13.091 3.207 12.051 3 11 3C9.949 3 8.909 3.207 7.938 3.609C6.968 4.011 6.086 4.6 5.343 5.343C3.843 6.843 3 8.878 3 11C3 13.122 3.843 15.157 5.343 16.657C6.843 18.157 8.878 19 11 19C13.122 19 15.157 18.157 16.657 16.657Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/*function DetectDot() {
  return (
    <Svg width={27} height={27} viewBox="0 0 27 27" fill="none">
      <Rect x={1} y={1} width={25} height={25} rx={12.5} fill="black" fillOpacity={0.45} />
      <Rect x={1} y={1} width={25} height={25} rx={12.5} stroke="white" strokeWidth={2} />
      <Circle cx={13.5} cy={13.5} r={2.5} fill="white" />
    </Svg>
  );
}*/

/** L-shaped corner bracket */
function CornerBracket({
  position,
}: {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}) {
  const ARM = 40;
  const THICKNESS = 2;
  const COLOR = Colors.primary;

  const isLeft = position === 'topLeft' || position === 'bottomLeft';
  const isTop = position === 'topLeft' || position === 'topRight';

  return (
    <View
      style={{
        position: 'absolute',
        ...(isLeft ? { left: 0 } : { right: 0 }),
        ...(isTop ? { top: 0 } : { bottom: 0 }),
        width: ARM,
        height: ARM,
      }}
    >
      {/* Horizontal arm */}
      <View
        style={{
          position: 'absolute',
          ...(isTop ? { top: 0 } : { bottom: 0 }),
          ...(isLeft ? { left: 0 } : { right: 0 }),
          width: ARM,
          height: THICKNESS,
          backgroundColor: COLOR,
        }}
      />
      {/* Vertical arm */}
      <View
        style={{
          position: 'absolute',
          ...(isLeft ? { left: 0 } : { right: 0 }),
          ...(isTop ? { top: 0 } : { bottom: 0 }),
          width: THICKNESS,
          height: ARM,
          backgroundColor: COLOR,
        }}
      />
    </View>
  );
}

export default function DietLogScreen() {
  const [loading, setLoading] = React.useState(false); //로딩 추가
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null); 
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#FFF', textAlign: 'center', marginTop: 100 }}>
          카메라 권한이 필요합니다.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.shutterOuter}>
          <Text>권한 허용</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleImageResult = (uri: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // 로딩 해제
      router.push({ pathname: '/dietlog/result', params: { imageUri: uri } });
    }, 2500);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) handleImageResult(result.assets[0].uri);
  };

  /** 카메라로 사진 찍기 로직 (셔터 버튼) */
  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: false,
          exif: false,
        });
        if (photo) handleImageResult(photo.uri);
      } catch (e) {
        Alert.alert("에러", "사진 촬영에 실패했습니다.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top, zIndex: 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBackBtn}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>식단 기록</Text>
      </View>

      <CameraView style={styles.camera} ref={cameraRef} facing="back">
        {/* 가이드 프레임 */}
        <View style={styles.overlay}>
          <View style={styles.focusFrame}>
            <CornerBracket position="topLeft" />
            <CornerBracket position="topRight" />
            <CornerBracket position="bottomLeft" />
            <CornerBracket position="bottomRight" />
          </View>
        </View>

        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionItem} onPress={pickImage}>
            <Text style={styles.actionLabel}>갤러리에서{"\n"}불러오기</Text>
            <View style={styles.actionIconCircle}><GalleryIcon /></View>
          </TouchableOpacity>

          <View style={styles.shutterWrapper}>
            <Text style={styles.photoLabel}>PHOTO</Text>
            <TouchableOpacity style={styles.shutterOuter} onPress={takePhoto}>
              <View style={styles.shutterInner} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.actionItem} onPress={() => router.replace('/dietlog/search')}>
            <Text style={styles.actionLabel}>검색하기</Text>
            <View style={styles.actionIconCircle}><SearchIcon /></View>
          </TouchableOpacity>
        </View>
      </CameraView>

      <Modal transparent visible={loading} animationType="fade">
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>AI가 음식을 분석 중이에요...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const BRACKET_MARGIN = 22;
const BRACKET_WIDTH = SCREEN_WIDTH - BRACKET_MARGIN * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },

  /* ── Header ── */
  header: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  headerBackBtn: {
    padding: 4,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
  },

  /* ── Image / Camera Area ── */
  cameraArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  previewPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  /* Focus frame brackets */
  focusFrame: {
    position: 'absolute',
    left: BRACKET_MARGIN,
    top: 27,
    width: BRACKET_WIDTH,
    bottom: 190,
    opacity: 0.9,
  },

  /* Detection dots */
  detectDot: {
    position: 'absolute',
  },

  /* ── Bottom action bar ── */
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 182,
    backgroundColor: 'rgba(0,0,0,0.50)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 49,
    paddingBottom: 20,
    paddingTop: 10,
  },

  /* Gallery / Search item */
  actionItem: {
    width: 86,
    alignItems: 'center',
    gap: 12,
    flexDirection: 'column',
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
  actionIconCircle: {
    width: 49,
    height: 49,
    borderRadius: 24.5,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Camera shutter */
  shutterWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  photoLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1,
  },
  shutterOuter: {
    width: 79,
    height: 79,
    borderRadius: 39.5,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  shutterInner: {
    width: 63,
    height: 63,
    borderRadius: 31.5,
    backgroundColor: '#FFFFFF',
  },

  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // 배경을 어둡게 해서 로딩에 집중
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginTop: 15,
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
