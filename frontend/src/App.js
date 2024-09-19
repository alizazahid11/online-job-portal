// src/App.js
import React from 'react';
import './App.css';
import Signup from './components/signup';
import { ProfileProvider } from './components/ProfileContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Homepg from './components/homepg';
import EmployerProfileSetup from './components/employer_profile';
import JobSeekerProfileSetup from './components/job-seeker_profile';
import EmployerDashboard from './components/employer_dashboard';
import JobSeekerDashboard from './components/jobseeker_dashboard';
import JobPosting from './components/job-posting';
import JobListing from './components/job_listing';
import JobDescription from './components/job-descrption';
import AppSubmit from './components/app-submit';

function App() {
  return (
    <ProfileProvider>
      <Router>
       
        <Routes>
          <Route path="/" element={<Homepg />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer/profile" element={<EmployerProfileSetup />} />
          <Route path="/jobseeker/profile" element={<JobSeekerProfileSetup />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
          <Route path='/job-posting' element={<JobPosting/>}/>
          <Route path='/job-listing' element={<JobListing/>}/>
          <Route path='/job-desc/:id' element={<JobDescription/>}/>
          <Route path='/app-submit/:jobId' element={<AppSubmit/>}/>
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
