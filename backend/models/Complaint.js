const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // e.g., C-1001
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, default: 'Medium' },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'In Progress', 'Resolved', 'Escalated'], 
        default: 'Pending' 
    },
    date: { type: String }, // ISO formatted date
    studentId: { type: String, required: true }, // References custom user ID (e.g., s1)
    studentName: { type: String, required: true },
    room: { type: String },
    block: { type: String },
    upvotes: { type: Number, default: 0 },
    images: [{ type: String }], // URLs for uploaded images
    videos: [{ type: String }], // URLs for uploaded videos
    timeline: [{
        status: String,
        date: String,
        note: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
