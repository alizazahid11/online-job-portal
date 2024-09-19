import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './ProfileContext';

const JobPosting = () => {
    const { profile } = useContext(ProfileContext);
    const [jobDetails, setJobDetails] = useState({
        companyName: profile.companyName || '', // Initialize with company name from context
        jobTitle: '',
        jobDescription: '',
        location: '',
        salary: '',
        requirements: '',
    });

    useEffect(() => {
        // Update jobDetails when profile.companyName changes
        setJobDetails(prevDetails => ({
            ...prevDetails,
            companyName: profile.companyName || ''
        }));
    }, [profile.companyName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobDetails({ ...jobDetails, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8001/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jobDetails),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Job posted successfully!');
                setJobDetails({
                    companyName: '', // Reset company name
                    jobTitle: '',
                    jobDescription: '',
                    location: '',
                    salary: '',
                    requirements: '',
                });

                navigate('/job-listing');
            } else {
                alert(data.message || 'Failed to post job.');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('An error occurred while posting the job.');
        }
    };

    return (
        <div className="outer-container">
            <div className="job-posting">
                <h2>Post a Job</h2>
                <div className="form-container">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name:</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={jobDetails.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobTitle">Job Title:</label>
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle"
                                value={jobDetails.jobTitle}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jobDescription">Job Description:</label>
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                value={jobDetails.jobDescription}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={jobDetails.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="salary">Salary:</label>
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                value={jobDetails.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="requirements">Requirements:</label>
                            <textarea
                                id="requirements"
                                name="requirements"
                                value={jobDetails.requirements}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Post Job</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobPosting;
