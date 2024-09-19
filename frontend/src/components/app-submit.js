import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const AppSubmit = () => {
  const { jobId } = useParams(); // Get job ID from the URL
  console.log('Job ID:', jobId); // Debugging: Log jobId to verify it's being passed correctly

  const [resume, setResume] = useState(null);
  const formRef = useRef(null);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]); // Capture the uploaded resume
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (resume) {
      const formData = new FormData();
      formData.append('resume', resume); // Append resume file
      formData.append('jobId', jobId); // Append job ID from URL

      try {
        const response = await fetch('http://localhost:8001/api/applications', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to submit resume');
        }

        const result = await response.json();
        console.log('Resume submitted:', result);
        window.alert('Thank you! Your resume has been submitted.');

        formRef.current.reset(); // Reset form
        setResume(null); // Clear resume state
      } catch (error) {
        console.error('Error:', error.message);
        window.alert('Failed to submit resume. Please try again.');
      }
    } else {
      window.alert('Please upload a resume.');
    }
  };

  return (
    <div className="app-submit-bg">
      <div className="app-submit-container">
        <form onSubmit={handleSubmit} ref={formRef}>
          <h2>Upload Your Resume</h2>
          <div className="file-input">
            <label htmlFor="resume">Choose a file:</label>
            <input 
              type="file" 
              id="resume" 
              accept=".pdf,.doc,.docx" 
              onChange={handleResumeChange} 
              required 
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AppSubmit;
