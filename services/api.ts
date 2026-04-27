import axios from 'axios';

export const API = axios.create({
  baseURL: '백엔드 서버 주소',
  timeout: 5000, // 5초 넘으면 에러 처리
});