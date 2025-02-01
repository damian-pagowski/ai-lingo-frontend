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
