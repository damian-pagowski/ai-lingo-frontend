import { apiClient } from './apiClient';

export const getUserProfile = async () => {
  return await apiClient('profile', {
    method: 'GET',
  });
};

export const updateUserProfile = async (data) => {
  return await apiClient('profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};