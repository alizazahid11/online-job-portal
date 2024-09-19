import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();

    // Clear the form inputs when the component mounts
    useEffect(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setCompanyName("");
    }, []);

    const navigateToLogin = () => {
        navigate('/login');
    };

    const collectData = async (event) => {
        event.preventDefault();
        const data = role === "employer" ?
            { username, email, password, role, companyName } :
            { username, email, password, role };

        let result = await fetch("http://localhost:8001/signup", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        result = await result.json();
        localStorage.setItem("user", JSON.stringify(result.user));

        if (role === "employer") {
            navigate('/employer/profile');
        } else {
            navigate('/jobseeker/profile');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                {/* Left Section: Welcome */}
                <div className="signup-left">
                    <h2>Welcome Back!</h2>
                    <p>To keep connected with us, please log in with your personal info</p>
                    <button onClick={navigateToLogin}>Login</button>
                </div>

                {/* Right Section: Signup Form */}
                <div className="signup-right">
                    <h2>Create Account</h2>


                    <form onSubmit={collectData} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="username"></label>
                            <div className="input-wrapper">
                                <i className="fas fa-user icon"></i>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Username"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email"></label>
                            <div className="input-wrapper">
                                <i className="fas fa-envelope icon"></i>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <div className="input-wrapper">
                                <i className="fas fa-lock icon"></i>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="form-group">
                            <label htmlFor="role"></label>
                            <div className="input-wrapper">
                                <i className="fas fa-user-tag icon"></i>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="job-seeker">Job Seeker</option>
                                    <option value="employer">Employer</option>
                                </select>
                            </div>
                        </div>


                       
                        

                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
