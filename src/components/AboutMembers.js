import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AboutMembers({ onLogout }) {
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('SelectedProfile'));
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return <p>User not found!</p>;

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    onLogout();
    navigate('/');
  };

  return (
    <div>
      <div className="logout-profile">
        <Link className="link-profile" to="/" onClick={handleLogout}>
          Log Out
        </Link>
      </div>
      <h3 className="welcome">Welcome, {user.name}!</h3>
      <div className="profile-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Job Title: {user.jobTitle}</p>
      </div>
      <Link className="back-link" to="/members">
        Back to Member List
      </Link>
    </div>
  );
}

export default AboutMembers;
