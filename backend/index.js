const express = require('express');
const cors = require('cors');
const User = require('./db/users');
const connectDB = require('./db/config');
const Employer = require('./db/employers');
const Jobseeker = require('./db/jobseekers'); 
const Job = require('./db/job_posting'); 
const Application = require('./db/application'); // Import the new Application model
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

connectDB();

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/', // Directory to store uploaded files
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// User signup
app.post('/signup', async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.status(201).json(result);
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ result: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ result: 'No user found with the provided email' });
    }

    console.log('Stored Password:', user.password);
    console.log('Provided Password:', password);

    if (password !== user.password) {
      return res.status(401).json({ result: 'Incorrect password' });
    }

    res.status(200).json({ result: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ result: 'Internal server error' });
  }
});

// Employer profile setup route
app.post('/api/employer/profile', async (req, res) => {
  try {
      const { companyName, description, website, location, contactEmail, industry } = req.body;

      let employer = new Employer({
          companyName,
          description,
          website,
          location,
          contactEmail,
          industry
      });

      let result = await employer.save();
      res.status(201).json({ success: true, result });
  } catch (error) {
      console.error('Error saving employer profile:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Job seeker profile setup
app.post('/api/jobseeker/profile', async (req, res) => {
  try {
      const { fullName, email, phoneNumber, location, skills, experience } = req.body;

      let jobSeeker = new Jobseeker({
          fullName,
          email,
          phoneNumber,
          location,
          skills,
          experience
      });

      let result = await jobSeeker.save();
      res.status(201).json({ success: true, result });
  } catch (error) {
      console.error('Error saving job seeker profile:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// Job posting route
app.post('/api/jobs', async (req, res) => {
  try {
    const { companyName, jobTitle, jobDescription, location, salary, requirements } = req.body;

    let job = new Job({
        companyName, 
        jobTitle,
        jobDescription,
        location,
        salary,
        requirements,
    });

    let result = await job.save();
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error('Error posting job:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});

// Job listing route
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from the database
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Fetch individual job by ID
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error('Error fetching job:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/api/applications', upload.single('resume'), async (req, res) => {
  try {
    const { jobId } = req.body;
    const resume = req.file;

    if (!resume) {
      console.log('Resume file not received');
      return res.status(400).json({ message: 'Resume file is required' });
    }

    let application = new Application({
      jobId,
      resume: resume.path, // Store the file path
    });

    let result = await application.save();
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error('Error submitting resume:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
});


app.listen(8001, () => {
  console.log('Server is running on http://localhost:8001');
});
