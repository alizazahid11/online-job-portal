const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    location: { type: String, required: true },
    contactEmail: { type: String, required: true },
    industry: { type: String, required: true }
});

module.exports = mongoose.model('Employer', employerSchema);
