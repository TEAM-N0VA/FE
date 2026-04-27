import { API } from './api';
import { BloodSugarRequest } from './types';

//혈당기록 api
export const postBloodSugar = async (data: BloodSugarRequest) => {
  const response = await API.post('/blood-sugar', data);
  return response.data;
};

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