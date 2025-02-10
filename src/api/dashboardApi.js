import { apiClient } from './apiClient';



export const getDashboard = async () => {
  return await apiClient("dashboard", {
    method: "GET",
  });
};