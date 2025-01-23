const API_URL = 'http://localhost:3000';

export const apiClient = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  };

  const config = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API error:', error.message);
    throw error;
  }
};