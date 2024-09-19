const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['employer', 'job-seeker'], // You can define other roles if needed
    required: true
  }
});

// Export the model
module.exports = mongoose.model('User', userSchema);
