const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'warden', 'admin'], required: true },
    id: { type: String, unique: true }, // Custom ID like s1, w1
    avatar: { type: String },
    // Student specifics
    room: { type: String },
    block: { type: String },
    phone: { type: String },
    parentPhone: { type: String },
    currentStatus: { type: String, default: 'In Hostel' },
    // Warden specifics
    isOnDuty: { type: Boolean, default: false },
    lastActive: { type: String }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
