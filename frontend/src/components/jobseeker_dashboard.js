import React, { useContext, useState } from 'react';
import { ProfileContext } from './ProfileContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const JobSeekerDashboard = () => {
    const { profile, setProfile } = useContext(ProfileContext); // Assuming setProfile is available to update the context
    const [isEditing, setIsEditing] = useState({
        fullName: false,
        email: false,
        phoneNumber: false,
        location: false,
        skills: false,
        experience: false
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
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="job-seeker-dashboard">
            <nav className="job-seeker-dashboard-navbar">
                <div className="job-seeker-dashboard-navbar-content">
                    <span className="job-seeker-dashboard-name">{profile.fullName}</span>
                    <Link to="/job-listing" className="employer-dashboard-job-posting-link" onClick={() => console.log('Job posting link clicked')}>
    See Jobs
</Link>
                    <button 
                        className="job-seeker-dashboard-logout-button" 
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="job-seeker-dashboard-background">
                <div className="job-seeker-dashboard-header">
                    <div className="profile-image-container">
                        <img 
                            src={profile.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRXrLfkPut6EaXDD0RpaHBzeqgScyncU5dkw&s'} 
                            alt="Profile" 
                        />
                        <div className="camera-icon">
                            <i className="fa fa-camera"></i>
                        </div>
                    </div>
                    {isEditing.fullName ? (
                        <div>
                            <input 
                                type="text" 
                                value={tempProfile.fullName} 
                                onChange={(e) => handleInputChange(e, 'fullName')} 
                            />
                            <button onClick={() => handleSave('fullName')}>Save</button>
                            <button onClick={() => handleCancel('fullName')}>Cancel</button>
                        </div>
                    ) : (
                        <h1>{profile.fullName}</h1>
                    )}
                    <p>{profile.location}</p>
                </div>
            </div>
            <div className="job-seeker-dashboard-details">
                <div className="box box1">
                    <div className="job-seeker-dashboard-detail-box">
                        <h2>Email</h2>
                        {isEditing.email ? (
                            <div>
                                <input 
                                    type="email" 
                                    value={tempProfile.email} 
                                    onChange={(e) => handleInputChange(e, 'email')} 
                                />
                                <button onClick={() => handleSave('email')}>Save</button>
                                <button onClick={() => handleCancel('email')}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.email}</p>
                                <i
                                    className="fa fa-pencil-alt job-seeker-dashboard-edit-icon"
                                    onClick={() => handleEdit('email')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="box box2">
                    <div className="job-seeker-dashboard-detail-box">
                        <h2>Phone Number</h2>
                        {isEditing.phoneNumber ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={tempProfile.phoneNumber} 
                                    onChange={(e) => handleInputChange(e, 'phoneNumber')} 
                                />
                                <button onClick={() => handleSave('phoneNumber')}>Save</button>
                                <button onClick={() => handleCancel('phoneNumber')}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.phoneNumber}</p>
                                <i
                                    className="fa fa-pencil-alt job-seeker-dashboard-edit-icon"
                                    onClick={() => handleEdit('phoneNumber')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="box box4">
                    <div className="job-seeker-dashboard-detail-box">
                        <h2>Skills</h2>
                        {isEditing.skills ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={tempProfile.skills} 
                                    onChange={(e) => handleInputChange(e, 'skills')} 
                                />
                                <button onClick={() => handleSave('skills')}>Save</button>
                                <button onClick={() => handleCancel('skills')}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.skills}</p>
                                <i
                                    className="fa fa-pencil-alt job-seeker-dashboard-edit-icon"
                                    onClick={() => handleEdit('skills')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="box box5">
                    <div className="job-seeker-dashboard-detail-box">
                        <h2>Experience</h2>
                        {isEditing.experience ? (
                            <div>
                                <input 
                                    type="text" 
                                    value={tempProfile.experience} 
                                    onChange={(e) => handleInputChange(e, 'experience')} 
                                />
                                <button onClick={() => handleSave('experience')}>Save</button>
                                <button onClick={() => handleCancel('experience')} className='cancel'>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{profile.experience}</p>
                                <i
                                    className="fa fa-pencil-alt job-seeker-dashboard-edit-icon"
                                    onClick={() => handleEdit('experience')}
                                ></i>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobSeekerDashboard;
