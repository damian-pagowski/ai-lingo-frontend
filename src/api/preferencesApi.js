import { apiClient } from './apiClient';

export const saveUserPreferences = async (data) => {
  return await apiClient('preferences', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};