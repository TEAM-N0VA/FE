import { Button, Text } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

const MealdangIcon = (props: any) => (
    <Image 
      source={require('@/assets/images/Vector.png')} 
      style={[props.style, { width: 23, height: 23 }]}
    />
);

const GoogleIcon = (props: any) => (
    <Image 
      source={require('@/assets/images/Google.png')} 
      style={[props.style, { width: 20, height: 20, tintColor: null }]}
      resizeMode="contain"
    />
);

const KakaoIcon = (props: any) => (
  <Image 
    source={require('@/assets/images/Kakao.png')} 
    style={[props.style, { width: 20, height: 20, tintColor: null }]} 
    resizeMode="contain"
  />
);

export default function SelectLoginScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.white]} 
      locations={[0.5, 1.0]}
      style={styles.background}
    >
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          meal과 혈당 사이의 완벽한 균형
        </Text>
        <Text category='h1' style={styles.title}>
          밀당
        </Text>
      </View>

      <View style={styles.mainGap} />

      <View style={styles.buttonContainer}>
          <Button 
            accessoryLeft={MealdangIcon}
            style={[styles.baseButton, styles.mealdangButton]} 
            onPress={() => router.push('/(auth)/login')}
          >
            {() => (
              <View style={styles.buttonTextWrapper}>
                <Text style={[styles.mealdangButtonText, { color: Colors.primary }]}>
                  <Text style={[styles.boldText, { color: Colors.primary }]}>밀당 ID</Text>로 시작하기
                </Text>
              </View>
            )}
          </Button>

          <Button 
            accessoryLeft={GoogleIcon}
            style={[styles.baseButton, styles.googleButton]} 
            onPress={() => {}}
          >
            {() => (
              <View style={styles.buttonTextWrapper}>
                <Text style={styles.googleText}>
                  <Text style={styles.boldText}>Google 계정</Text>으로 시작하기
                </Text>
              </View>
            )}
          </Button>

          <Button 
            accessoryLeft={KakaoIcon}
            style={[styles.baseButton, styles.kakaoButton]} 
            onPress={() => {}}
          >
            {() => (
              <View style={styles.buttonTextWrapper}>
                <Text style={styles.kakaoText}>
                  <Text style={styles.boldText}>카카오톡</Text>으로 시작하기
                </Text>
              </View>
            )}
          </Button>
          
      </View>
    </View>    
    </SafeAreaView>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { 
    flex: 1, 
    paddingBottom: 96, 
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', 
  },
  header: { 
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'flex-start', 
  },
  title: { 
    fontSize: 27, 
    fontWeight: '900', 
    color: '#736464',
    letterSpacing: 1.35,
    fontFamily: 'Noto Sans',
  },
  subtitle: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#736464',
    letterSpacing: 0.48,
    marginBottom: 4,
    fontFamily: 'Noto Sans',
  },
  mainGap: {
    height: 241, 
  },
 buttonContainer: { 
    width: '100%',
    alignItems: 'center',
    gap: 24, 
  },
  baseButton: { 
    width: 350, 
    height: 50,
    borderRadius: 12, 
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  boldText: {
    fontWeight: 'bold',
  },
  mealdangButton: {
    backgroundColor: '#926897',
  },
  mealdangButtonText: {
    color: Colors.primary,
    fontSize: 16,
  },
  googleButton: { 
    backgroundColor: '#FFFFFF', 
    borderColor: '#DDDDDD', 
    borderWidth: 1 
  },
  googleText: { 
    color: '#000000', 
    fontSize: 16,
  },
  kakaoButton: { 
    backgroundColor: '#FEE500' 
  },
  kakaoText: { 
    color: '#000000', 
    fontSize: 16,
  },
});