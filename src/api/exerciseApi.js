import { apiClient } from "./apiClient";

export const getExerciseById = async (id) => {
  return await apiClient(`exercise/${id}`, {
    method: "GET",
  });
};

export const voteExercise = async (data) => {
  return await apiClient(`vote-exercise`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};