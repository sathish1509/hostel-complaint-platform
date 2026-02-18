import api from '../utils/api';

export const loginUser = async (email, password, role) => {
  try {
    const response = await api.post('/auth/login', { email, password, role });
    const { user, token } = response.data;
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    
    return { user, token };
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};
