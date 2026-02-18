require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const bcrypt = require('bcryptjs');

const MOCK_USERS = [
  {
    id: 's1',
    name: 'John Student',
    email: 'student@hostel.com',
    password: '123',
    role: 'student',
    room: '101',
    block: 'A',
    phone: '+91 98765 43210',
    parentPhone: '+91 87654 32109',
    currentStatus: 'In Hostel',
    avatar: 'https://ui-avatars.com/api/?name=John+Student'
  },
  {
    id: 'w1',
    name: 'Mr. Ramesh (Block A)',
    email: 'warden@hostel.com',
    password: '123',
    role: 'warden',
    block: 'A',
    isOnDuty: true,
    lastActive: 'Now',
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

const INITIAL_COMPLAINTS = [
  {
    id: "C-1001",
    title: "Leaking Tap in Room 101",
    description: "The bathroom tap is leaking continuously.",
    category: "Plumbing",
    priority: "High",
    status: "Pending",
    date: "2023-10-25",
    studentName: "John Student",
    studentId: "s1",
    room: "101",
    block: "A",
    upvotes: 2,
    images: [],
    timeline: [
        { status: 'Submitted', date: '2023-10-25', note: 'Complaint raised by student' }
    ]
  },
  {
    id: "C-1002",
    title: "Broken Fan Regulator",
    description: "Fan regulator is loose and not working.",
    category: "Electrical",
    priority: "Medium",
    status: "In Progress",
    date: "2023-10-24",
    studentName: "Mike Ross",
    studentId: "s2",
    room: "102",
    block: "A",
    upvotes: 0,
    images: [],
    timeline: [
        { status: 'Submitted', date: '2023-10-24', note: 'Complaint raised' },
        { status: 'Approved', date: '2023-10-25', note: 'Approved by Warden' },
        { status: 'In Progress', date: '2023-10-26', note: 'Electrician assigned' }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Complaint.deleteMany({});

    // Hash passwords before seeding
    const seededUsers = await Promise.all(MOCK_USERS.map(async (user) => {
      // pre-save hook in User model will handle hashing if we use User.create()
      return user;
    }));

    await User.create(seededUsers);
    await Complaint.insertMany(INITIAL_COMPLAINTS);

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
