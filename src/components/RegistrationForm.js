import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';

function RegistrationForm() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    const { firstName, lastName, email, password } = userData;

    if (!firstName || !lastName || !email || !password) {
      alert('please fill all fields in with correct data');
      return;
    }
    //  Get existing users or start with an empty array
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    //   Add new user to the list
      existingUsers.push(userData);
    //   Save the updated list to the localstorage
      localStorage.setItem("users", JSON.stringify(existingUsers));

    setIsRegistered(true);

    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <form className="login-registration-form registration" onSubmit={handleSubmit}>
        <p>Start your journey</p>
        <h3 className="title">Sign UP to TimeLine</h3>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        {!isRegistered && (
        <p className="link">
         Have an account? <Link to="/login">Sign In</Link>
        </p>
        )}
        
        {isRegistered && (
        <p>
          You have successfull registered!
          <Link to="/login">Log in here</Link>
        </p>
      )}
      </form>

     

      
    </div>
  );
}

export default RegistrationForm;
