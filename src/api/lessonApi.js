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

export const flagLesson = async (id) => {
  return await apiClient(`flag-lesson/${id}`, {
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

export const voteExercise = async (data) => {
  return await apiClient(`vote-exercise`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getNextLessonExercise = async (id) => {
  return await apiClient(`lessons/${id}/exercise`, {
    method: "GET",
  });
};

export const submitExerciseAnswer = async (lessonid, exerciseid, data) => {
  return await apiClient(`lessons/${lessonid}/exercise/${exerciseid}/answer`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getLessonSummary = async (id) => {
  return await apiClient(`lessons/${id}/summary`, {
    method: "GET",
  });
};
