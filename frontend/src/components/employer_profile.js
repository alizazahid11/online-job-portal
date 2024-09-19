import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './ProfileContext';

const EmployerProfileSetup = () => {
    const { profile, setProfile } = useContext(ProfileContext);
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [location, setLocation] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [industry, setIndustry] = useState("");
    const navigate = useNavigate();

    // Use useEffect to set profile data on component mount
    useEffect(() => {
        if (profile) {
            setCompanyName(profile.companyName || "");
            setDescription(profile.description || "");
            setWebsite(profile.website || "");
            setLocation(profile.location || "");
            setContactEmail(profile.contactEmail || "");
            setIndustry(profile.industry || "");
        }
    }, [profile]); // Dependency on profile ensures it only runs when profile changes

    const collectData = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('description', description);
        formData.append('website', website);
        formData.append('location', location);
        formData.append('contactEmail', contactEmail);
        formData.append('industry', industry);
    
        try {
            let response = await fetch("http://localhost:8001/api/employer/profile", {
                method: 'POST',
                body: JSON.stringify({
                    companyName,
                    description,
                    website,
                    location,
                    contactEmail,
                    industry
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const profileData = {
                companyName,
                description,
                website,
                location,
                contactEmail,
                industry
            };
            
            // Set profile data in context
            setProfile(profileData);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                throw new Error('Network response was not ok.');
            }
    
            let result = await response.json();
            if (result.success) {
                localStorage.setItem('companyName', companyName);
                navigate('/employer/dashboard');
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div className="employer-profile-setup">
            <div className="form-container">
                <h2>Employer Profile Setup</h2>
                <form onSubmit={collectData} autoComplete="off">
                    <div className="form-group">
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            placeholder="Company Name"
                        />
                        <i className="fas fa-building icon"></i>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Description"
                        />
                        <i className="fas fa-info-circle icon"></i>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            required
                            placeholder="Website"
                        />
                        <i className="fas fa-globe icon"></i>
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
                            type="email"
                            id="contactEmail"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                            placeholder="Contact Email"
                        />
                        <i className="fas fa-envelope icon"></i>
                    </div>

                    <div className="form-group">
                        <select
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="IT">IT</option>
                            <option value="Textile">Textile</option>
                        </select>
                        <i className="fas fa-industry icon"></i>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default EmployerProfileSetup;
