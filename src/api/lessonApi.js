import { apiClient } from './apiClient';

export const getLessons = async () => {
  return await apiClient('lessons', {
    method: 'GET',
  });
};


export const getLessonById = async (id) => {
  return await apiClient(`lessons/${id}`, {
    method: 'GET',
  });
}
