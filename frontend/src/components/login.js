import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/signup');
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
  
    try {
      let response = await fetch("http://localhost:8001/login", {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
  
      let result = await response.json();
  
      if (response.ok) {
        // Assuming the result contains the user object
        if (result && result.user) {
          const user = result.user;
  
          // Store the user object in localStorage
          localStorage.setItem("user", JSON.stringify(user));
  
          // Redirect based on role if available
          if (user.role === 'employer') {
            navigate('/employer/dashboard');
          } else if (user.role === 'job-seeker') {
            navigate('/jobseeker/dashboard');
          } else {
            // Redirect to a default page if role is not recognized
            navigate('/');
          }
        } else {
          // Handle login failure
          alert(result.result || "Invalid email or password. Please try again.");
        }
      } else {
        // Handle HTTP errors
        alert(result.result || "An error occurred. Please try again.");
      }
  
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Section: Welcome */}
        <div className="login-left">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us, please log in with your personal info</p>
          <button onClick={navigateToSignup}>Signup</button>
        </div>

        {/* Right Section: Login Form */}
        <div className="login-right">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleLogin}>
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
        
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
