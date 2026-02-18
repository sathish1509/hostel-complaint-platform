const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');

// Get all complaints
router.get('/', auth, async (req, res) => {
    try {
        let query = {};
        // Students only see their own complaints
        if (req.user.role === 'student') {
            query.studentId = req.user.customId;
        }
        // Wardens/Admins can filter by block if needed, but for now show all
        const complaints = await Complaint.find(query).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new complaint
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, category, priority, room, block, studentName } = req.body;
        
        const count = await Complaint.countDocuments();
        const customId = `C-${1001 + count}`;

        const newComplaint = new Complaint({
            id: customId,
            title,
            description,
            category,
            priority,
            room,
            block,
            studentName,
            studentId: req.user.customId,
            date: new Date().toISOString().split('T')[0],
            timeline: [{ 
                status: 'Submitted', 
                date: new Date().toISOString().split('T')[0], 
                note: 'Complaint raised via platform' 
            }]
        });

        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status, note } = req.body;
        const complaint = await Complaint.findOne({ id: req.params.id });
        
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.status = status;
        complaint.timeline.push({
            status,
            date: new Date().toISOString().split('T')[0],
            note
        });

        await complaint.save();
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upvote
router.patch('/:id/upvote', auth, async (req, res) => {
    try {
        const complaint = await Complaint.findOne({ id: req.params.id });
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
        
        complaint.upvotes += 1;
        await complaint.save();
        res.json(complaint);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
