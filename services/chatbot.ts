import { Platform } from 'react-native';
import { API } from './api';
import { ChatRequest } from './types';

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
export const sendChatMessage = async (chatData: ChatRequest) => { // ✅ 타입 적용
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