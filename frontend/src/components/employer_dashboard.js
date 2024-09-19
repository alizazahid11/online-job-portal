import React, { useContext, useState } from 'react';
import { ProfileContext } from './ProfileContext';
import { Link, useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
    const { profile, setProfile } = useContext(ProfileContext); // Assuming setProfile is available to update the context
    const [isEditing, setIsEditing] = useState({
        companyName: false,
        location: false,
        description: false,
        website: false,
        contactEmail: false,

        industry: false
    });

    const [tempProfile, setTempProfile] = useState(profile); // Temporary state for the inputs
    const navigate = useNavigate();

    const handleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSave = (field) => {
        setProfile((prev) => ({
            ...prev,
            [field]: tempProfile[field]
        }));
        setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    const handleCancel = (field) => {
        setTempProfile(profile); // Reset temp state to original profile
        setIsEditing((prev) => ({ ...prev, [field]: false }));
    };

    const handleInputChange = (e, field) => {
        setTempProfile((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        navigate('/');
    };

    return (
        <div className="employer-dashboard">
            <nav className="employer-dashboard-navbar">
                <div className="employer-dashboard-navbar-content">
                    
                    <Link to="/job-posting" className="employer-dashboard-job-posting-link" onClick={() => console.log('Job posting link clicked')}>
    Post a Job
</Link>
                    <button className="employer-dashboard-logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className="employer-dashboard-background">
                <div className="employer-dashboard-header">
                    {isEditing.companyName ? (
                        <div>
                            <input
                                type="text"
                                value={tempProfile.companyName}
                                onChange={(e) => handleInputChange(e, 'companyName')}
                            />
                            <button onClick={() => handleSave('companyName')}>Save</button>
                            <button onClick={() => handleCancel('companyName')}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h1>{profile.companyName}</h1>

                        </div>
                    )}
                    <p>{profile.location}</p>
                </div>
            </div>
            <div className="employer-dashboard-details">
                <div className="box box1">
                    <div className="employer-dashboard-detail-box">
                        <h2>Description</h2>
                        {isEditing.description ? (
                            <div>
                                <input
                                    type="text"
                                    value={tempProfile.description}
                                    onChange={(e) => handleInputChange(e, 'description')}
                                />
                                <button onClick={() => handleSave('description')}>Save</button>
                                <button onClick={() => handleCancel('description')}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.description}</p>
                                <i
                                    className="fa fa-pencil-alt employer-dashboard-edit-icon"
                                    onClick={() => handleEdit('description')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="box box2">
                    <div className="employer-dashboard-detail-box">
                        <h2>Website</h2>
                        {isEditing.website ? (
                            <div>
                                <input
                                    type="text"
                                    value={tempProfile.website}
                                    onChange={(e) => handleInputChange(e, 'website')}
                                />
                                <button onClick={() => handleSave('website')}>Save</button>
                                <button onClick={() => handleCancel('website')}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.website}</p>
                                <i
                                    className="fa fa-pencil-alt employer-dashboard-edit-icon"
                                    onClick={() => handleEdit('website')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="box box3">
                    <div className="employer-dashboard-detail-box">
                        <h2>Contact Email</h2>
                        {isEditing.contactEmail ? (
                            <div>
                                <input
                                    type="text"
                                    value={tempProfile.contactEmail}
                                    onChange={(e) => handleInputChange(e, 'contactEmail')}
                                />
                                <button onClick={() => handleSave('contactEmail')}>Save</button>
                                <button onClick={() => handleCancel('contactEmail')}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.contactEmail}</p>
                                <i
                                    className="fa fa-pencil-alt employer-dashboard-edit-icon"
                                    onClick={() => handleEdit('contactEmail')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="box box4">
                    <div className="employer-dashboard-detail-box">
                        <h2>Industry</h2>
                        {isEditing.industry ? (
                            <div>
                                <input
                                    type="text"
                                    value={tempProfile.industry}
                                    onChange={(e) => handleInputChange(e, 'industry')}
                                />
                                <button onClick={() => handleSave('industry')}>Save</button>
                                <button onClick={() => handleCancel('industry')}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.industry}</p>
                                <i
                                    className="fa fa-pencil-alt employer-dashboard-edit-icon"
                                    onClick={() => handleEdit('industry')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
