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

    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem('token', data.token);
    } else {
      throw new Error('Token not received');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
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
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};