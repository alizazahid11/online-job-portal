
const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    skills: { type: String, required: true },
    experience: { type: String, required: true }
});

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
