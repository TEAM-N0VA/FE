import axios from 'axios';
import { Platform } from 'react-native';

const API = axios.create({
  baseURL: '백엔드 서버 주소',
  timeout: 5000, // 5초 넘으면 에러 처리
});

// 혈당 조회 api
export const getBloodSugar = async (date: string) => {
  try {
    const response = await API.get(`/blood-sugar?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("혈당 조회 에러:", error);
    throw error;
  }
};

// 혈당 기록 api
export const postBloodSugar = async (data: {
  user_id: number;
  measured_at: string;
  value: number;
  recorded_type: string;
  meal_log_id?: number;
}) => {
  try {
    const response = await API.post('/blood-sugar', data);
    return response.data;
  } catch (error) {
    console.error("혈당 기록 저장 에러:", error);
    throw error;
  }
};

// 식단 기록 api
export const postDietLog = async (data: object) => {
  return await API.post('/diet-log', data);
};

// 챗봇 세션 생성 API (화면 진입 시 호출)
export const createChatSession = async (userId: number) => {
  try {
    const response = await API.post('/api/faq-chat/sessions', {
      userId,
      deviceId: Platform.OS === 'ios' ? 'ios-simulator' : 'android-device',
      locale: 'ko',
    });
    return response.data;
  } catch (error) {
    console.error("세션 생성 에러:", error);
    throw error;
  }
};

// 챗봇 메시지 전송 API (RAG/FAQ 검색)
export const sendChatMessage = async (chatData: {
  sessionId: number;
  message: string;
  history: { role: string; content: string }[];
}) => {
  try {
    const response = await API.post('/api/faq-chat/chat', chatData);
    return response.data;
  } catch (error) {
    console.error("채팅 전송 에러:", error);
    throw error;
  }
};

// 이전 메시지 내역 조회 API
export const getChatMessages = async (sessionId: number) => {
  try {
    const response = await API.get(`/api/faq-chat/sessions/${sessionId}/messages`);
    return response.data;
  } catch (error) {
    console.error("메시지 조회 에러:", error);
    throw error;
  }
};