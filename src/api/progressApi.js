import { apiClient } from "./apiClient";

export const submitLessonProgress = async (lessonId, answers) => {
  return await apiClient(`submit-answers`, {
    method: "POST",
    body: JSON.stringify({
      lessonId: lessonId,
      answers: answers,
    }),
  });
};

export const getUserProgress = async () => {
  return await apiClient("progress", {
    method: "GET",
  });
};
export const getLessonTracking = async () => {
  return await apiClient("lesson-tracking", {
    method: "GET",
  });
};

export const getRanking = async () => {
  return await apiClient("ranking", {
    method: "GET",
  });
};

