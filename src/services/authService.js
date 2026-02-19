// Demo users for the platform
const DEMO_USERS = [
  { id: '1', name: 'Student Demo', email: 'student@hostel.com', password: '123', role: 'student' },
  { id: '2', name: 'Warden Demo', email: 'warden@hostel.com', password: '123', role: 'warden' },
  { id: '3', name: 'Admin Demo', email: 'admin@hostel.com', password: '123', role: 'admin' },
];

export const loginUser = async (email, password, role) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get users from localStorage or use demo users
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const allUsers = [...DEMO_USERS, ...storedUsers];

  const user = allUsers.find(u => u.email === email && u.password === password && u.role === role);

  if (user) {
    const token = `standalone-token-${user.id}`;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { user, token };
  } else {
    throw { message: "Invalid credentials or role" };
  }
};

export const registerUser = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (storedUsers.some(u => u.email === userData.email) || DEMO_USERS.some(u => u.email === userData.email)) {
        throw { message: "Email already exists" };
    }

    const newUser = { ...userData, id: Date.now().toString() };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    return newUser;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};
