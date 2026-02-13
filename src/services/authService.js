// Simulated Auth Service

const USERS = [
  {
    id: 's1',
    name: 'John Student',
    email: 'student@hostel.com',
    password: '123',
    role: 'student',
    room: '101',
    block: 'A',
    avatar: 'https://ui-avatars.com/api/?name=John+Student'
  },
  {
    id: 'w1',
    name: 'Mr. Warden',
    email: 'warden@hostel.com',
    password: '123',
    role: 'warden',
    block: 'A',
    avatar: 'https://ui-avatars.com/api/?name=Mr+Warden'
  },
  {
    id: 'a1',
    name: 'Admin User',
    email: 'admin@hostel.com',
    password: '123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User'
  }
];

export const loginUser = async (email, password, role) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS.find(u => u.email === email && u.password === password);
      if (user) {
        if (user.role !== role) {
          reject({ message: "Invalid role for this user" });
          return;
        }
        const token = "mock-jwt-token-" + user.id;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        resolve({ user, token });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, 1000); // Simulate network delay
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};
