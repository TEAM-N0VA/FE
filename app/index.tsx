import { Text } from '@ui-kitten/components';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@/components/Logo';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

SplashScreen.preventAutoHideAsync();

export default function StartScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [fontsLoaded] = Font.useFonts({
    'BagelFatOne': require('../assets/fonts/BagelFatOne.ttf'),
  });

  // 2초 뒤에 로그인 선택 화면으로 자동 이동
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // 페이드 아웃 완료 후 화면 전환
        router.replace('/(auth)/select');
      });
    }, 1500);

    return () => clearTimeout(timer);
  }
  }, [fontsLoaded, fadeAnim, router]);

  if (!fontsLoaded) return null;

  return (
    <LinearGradient 
    colors={[Colors.primary, Colors.white]} 
    locations={[0.5, 1.0]}
    style={styles.background}
    >

    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoSection}>
          <Logo width={180} height={180} color={Colors.secondary} />
        </View>  

        <View style={styles.textContainer}>
            <Text category='s1' style={styles.subtitle}>
              meal과 혈당 사이의 완벽한 균형
            </Text>
            <Text category='headerLogo' style={styles.title}>
              밀당
            </Text>
          </View>
        </Animated.View>
    </SafeAreaView>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1,
  },
  container: { 
    flex: 1,
    paddingHorizontal: Layout.spacing.screenPadding,
    paddingBottom: 96, 
    alignItems: 'center',  
  },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: 187,
   },
  logoSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: 190, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8, 
  },
  title: { 
    fontSize: 40,        
    fontWeight: '800',          
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    flexWrap: 'nowrap',
    width: 350,
  },
});