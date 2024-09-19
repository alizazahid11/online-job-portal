import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './ProfileContext';

const JobSeekerProfileSetup = () => {
    const { setProfile } = useContext(ProfileContext); // Import the context
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const navigate = useNavigate();

    const collectData = async (event) => {
        event.preventDefault();
    
        try {
            let response = await fetch("http://localhost:8001/api/jobseeker/profile", {
                method: 'POST',
                body: JSON.stringify({
                    fullName,
                    email,
                    phoneNumber,
                    location,
                    skills,
                    experience
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                throw new Error('Network response was not ok.');
            }
    
            let result = await response.json();
            if (result.success) {
                // Update the profile context
                setProfile({
                    fullName,
                    email,
                    phoneNumber,
                    location,
                    skills,
                    experience
                });
                navigate('/jobseeker/dashboard');
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div className="job-seeker-profile-setup">
            <div className="form-container">
                <h2>Job Seeker Profile Setup</h2>
                <form onSubmit={collectData} autoComplete="off">
                    <div className="form-group">
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="Full Name"
                        />
                        <i className="fas fa-user icon"></i>
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                        />
                        <i className="fas fa-envelope icon"></i>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            placeholder="Phone Number"
                        />
                        <i className="fas fa-phone icon"></i>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            placeholder="Location"
                        />
                        <i className="fas fa-map-marker-alt icon"></i>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="skills"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            required
                            placeholder="Skills (comma separated)"
                        />
                        <i className="fas fa-cogs icon"></i>
                    </div>

                    <div className="form-group">
                        <textarea
                            id="experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                            placeholder="Experience"
                        />
                        <i className="fas fa-briefcase icon"></i>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default JobSeekerProfileSetup;
