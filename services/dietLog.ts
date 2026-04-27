import { API } from './api';

// 식단 기록 api
export const postDietLog = async (data: object) => {
  return await API.post('/diet-log', data);
};