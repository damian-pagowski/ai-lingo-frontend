import { apiClient } from "./apiClient";
const API_URL = import.meta.env.VITE_API_URL;

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

export const speaking = async (data, id) => {
  const defaultHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  };

  const config = {
    method: "POST",
    body: data,
    headers: { ...defaultHeaders },
  };

  return await fetch(`${API_URL}/speaking-exercise/${id}`, config);
};
