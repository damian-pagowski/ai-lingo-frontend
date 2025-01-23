import { apiClient } from './apiClient';
const API_URL = 'http://localhost:3000';

export const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
          throw new Error('Signup has failed');
        }
        return await response.json();
      } catch (error) {
        throw error;
      }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};