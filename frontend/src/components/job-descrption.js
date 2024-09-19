import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDescription = () => {
  const { id } = useParams(); // Get job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJob(data.job);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!job) return <p>No job found</p>;

  return (
    <div className="job-description-bg">
      <div className="job-description-container">
        <h2 className="job-des-title">{job.jobTitle}</h2>
        <p className="job-des-company"><strong>Company:</strong> {job.companyName}</p>
        <p className="job-des-location"><strong>Location:</strong> {job.location}</p>
        <p className="job-des-salary"><strong>Salary:</strong> {job.salary}</p>
        <Link to={`/app-submit/${id}`} className="apply-now-button">Apply Now</Link> {/* Ensure the correct path */}
        <p className="job-des-requirements"><strong>Requirements:</strong> {job.requirements}</p>
        <p className="job-des-description"><strong>Description:</strong> {job.jobDescription}</p>
      </div>
    </div>
  );
};

export default JobDescription;
