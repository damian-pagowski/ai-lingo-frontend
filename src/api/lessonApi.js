import { apiClient } from "./apiClient";

export const getLessons = async () => {
  return await apiClient("lessons", {
    method: "GET",
  });
};

export const getLessonById = async (id) => {
  return await apiClient(`lessons/${id}`, {
    method: "GET",
  });
};

export const createInitialLesson = async () => {
  return await apiClient(`create-initial-lesson`, {
    method: "POST",
    body: JSON.stringify({}),
  });
};

export const createLesson = async () => {
  return await apiClient(`create-lesson`, {
    method: "POST",
    body: JSON.stringify({}),
  });
};

export const createAiLesson = async () => {
  return await apiClient(`create-ai-lesson`, {
    method: "POST",
    body: JSON.stringify({}),
  });
};
