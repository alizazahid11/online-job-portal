import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/jobs');
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                setJobs(data.jobs); // Assuming data.jobs contains the list of jobs
                setFilteredJobs(data.jobs);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const results = jobs.filter(job =>
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(results);
    }, [searchTerm, jobs]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="job-listing-bg">
        <div className="job-listing-container">
            <h2>Job Listings</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for jobs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={() => setSearchTerm(searchTerm)}>Find Jobs</button>
            </div>
            <div className="job-listing">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div key={job._id} className="job-card">
                            <Link to={`/job-desc/${job._id}`} className="job-title-link">
                                <h3 className="job-title">{job.jobTitle}</h3>
                            </Link>
                            <p className="company-name"><strong></strong> {job.companyName}</p> {/* Company name added here */}
                            <p className="job-location"><strong></strong> {job.location}</p>
                            <p className="job-salary"><strong>Salary:</strong> {job.salary}</p>
                            <p className="job-description">{job.jobDescription}</p>
                        </div>
                    ))
                ) : (
                    <p className='no-job'>Sorry, no jobs available ;( </p>
                )}
            </div>
        </div>
        </div>
    );
};

export default JobListing;
