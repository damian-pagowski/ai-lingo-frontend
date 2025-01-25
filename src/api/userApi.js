import { apiClient } from './apiClient';

export const getUserProfile = async () => {
  return await apiClient('profile', {
    method: 'GET',
  });
};

export const updateOwnProfile = async (data) => {
  return await apiClient('users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};