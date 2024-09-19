import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Homepg() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="homepg-container">
        <div className="homepg-content">
          <h1>Welcome to the Online Job Portal</h1>
          <p>
            A centralized location for job seekers and employers to connect. Start your journey towards
            finding the right career or hire the best talent for your company. Join us today!
          </p>
          <button onClick={goToSignup}>Get Started</button>
        </div>
      </div>
    </>
  );
}
