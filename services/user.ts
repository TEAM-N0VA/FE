import { API } from './api';
import { UserProfileResponse } from './types';

export const getUserProfile = async (userId: number) => {
  const response = await API.get<{ status: string; data: UserProfileResponse }>(
    `/accounts/profile/${userId}/`
  );
  return response.data.data;
};