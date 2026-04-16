import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { BASE_URL } from '../../constants/config';

export default function SignupScreen() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 백엔드로 회원가입 요청 전송
    const handleSignupSubmit = async () => {
      // 빈칸 방지
      if (!name || !email || !password) {
        Alert.alert('입력 오류', '모든 항목을 입력해주세요.');
        return;
    }
      try {
        const response = await fetch(`${BASE_URL}/api/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password, name: name }), 
        });

        // 백엔드에서 보내는 에러 메시지
        const data = await response.json().catch(() => ({}));

        if (response.ok) {
            Alert.alert('회원가입이 완료되었습니다.');
            router.replace('/(auth)/login'); // 가입 성공 후 로그인 화면으로 이동
        } else {
        // 실패 시 백엔드가 보내준 에러 메시지를 화면에 띄움
        Alert.alert('가입 실패', data.message || '회원가입에 실패했습니다.');
        }
    } catch (error) {
        console.log('서버 에러:', error);
        Alert.alert('통신 에러', '서버에 연결할 수 없습니다. 백엔드 서버가 켜져 있는지 확인해주세요.');
    }
};
}