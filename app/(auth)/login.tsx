import { Button, CheckBox, Input, Text } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { BASE_URL } from '@/constants/config';
import { Ionicons } from '@expo/vector-icons'; // 뒤로가기 아이콘용

export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [saveId, setSaveId] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pw }),
    });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('로그인 성공!', '밀당에 오신 것을 환영합니다.');
        // TODO: 백엔드에서 받은 토큰(JWT)을 저장하는 로직 추가 필요
        router.replace('/(tabs)');
      } else {
        Alert.alert('로그인 실패', data.message || '아이디와 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('통신 에러', '서버에 연결할 수 없습니다.');
    }
  };

  return (
    <LinearGradient 
      colors={[Colors.primary, Colors.white]} 
      locations={[0.5, 1.0]}
      style={styles.background}
    >
    <SafeAreaView style={styles.container}>        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#494145" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>로그인</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.inputSection}>
          <Input
            placeholder='아이디를 입력하세요'
            value={id}
            onChangeText={setId}
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor="#E0DCDE"
          />
          <Input
            placeholder='비밀번호를 입력하세요'
            value={pw}
            secureTextEntry={true}
            onChangeText={setPw}
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor="#E0DCDE"
          />
        </View>
        
        <View style={styles.checkSection}>
          <CheckBox
            checked={autoLogin}
            onChange={(nextChecked: boolean) => setAutoLogin(nextChecked)}
            style={styles.checkbox}
          >
            {() => <Text style={styles.checkText}>자동 로그인</Text>}
          </CheckBox>
          <CheckBox
            checked={saveId}
            onChange={nextChecked => setSaveId(nextChecked)}
            style={styles.checkbox}
          >
            {() => <Text style={styles.checkText}>아이디 저장</Text>}
          </CheckBox>
        </View>

          <Button 
          style={styles.loginButton}
          onPress={() => router.replace('/(tabs)')}
        >
          {() => <Text style={styles.loginButtonText}>로그인</Text>}
        </Button>
          
        <View style={styles.findSection}>
          <TouchableOpacity><Text style={styles.findText}>아이디 찾기</Text></TouchableOpacity>
          <Text style={styles.divider}>|</Text>
          <TouchableOpacity><Text style={styles.findText}>비밀번호 찾기</Text></TouchableOpacity>
        </View>

        <View style={styles.signupSection}>
          <Text style={styles.signupGuidance}>아직 계정이 없으신가요?</Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signupText}>회원가입</Text>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
  </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { 
    flex: 1, 
    paddingHorizontal: 20, 
    alignItems: 'center' 
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 40,
  },
  backButton: { padding: 10 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#494145' },

  inputSection: { width: 354, gap: 9, marginBottom: 15 },
  input: {
    backgroundColor: '#F8F7F7',
    borderColor: 'transparent',
    borderRadius: 8,
    height: 50,
  },
  inputText: { fontSize: 16, color: '#494145' },

  checkSection: {
    width: 354,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 52,
    marginBottom: 30,
  },
  checkbox: { paddingHorizontal: 0 },
  checkText: { fontSize: 14, color: '#C8C1C4' },

  loginButton: {
    width: 350,
    height: 50,
    backgroundColor: '#926897',
    borderColor: '#926897',
    borderRadius: 12,
  },
  loginButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  
  findSection: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    gap: 15,
  },
  findText: { fontSize: 14, color: '#C8C1C4' },
  divider: { color: '#E0DCDE' },

  signupSection: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    gap: 10,
  },
  signupGuidance: { color: '#C8C1C4', fontSize: 14 },
  signupText: { color: '#926897', fontSize: 14, fontWeight: 'bold', textDecorationLine: 'underline' },
});