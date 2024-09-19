const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: { 
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    requirements: {
        type: [String], 
        required: true
    }
});

module.exports = mongoose.model('Jobpost', jobSchema);
