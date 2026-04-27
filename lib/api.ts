import axios from 'axios';

import { BASE_URL } from '@/constants/config';
import { ChatMsg, ChatResponse } from '@/lib/types';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export async function chat(message: string, history: ChatMsg[]): Promise<ChatResponse> {
  const response = await api.post('/chat', {
    message,
    history,
  });

  const data = response.data;

  return {
    answer:
      data?.result?.answer ??
      data?.answer ??
      data?.response ??
      data?.reply ??
      data?.message ??
      '답변을 받지 못했습니다.',
    evidence: data?.result?.evidence ?? data?.evidence,
  };
}
