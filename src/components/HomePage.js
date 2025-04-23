import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function HomePage() {
  // registration form
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
    jobTitle: '',
  });

  // login form
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);

  
  const navigate = useNavigate();


  const handleRegistrationChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // REGISTRATION FORM
  const registerOnSubmit = (e) => {
    e.preventDefault();
    console.log('User Registered:', registrationData);

    // Validations
    if(
      !registrationData.name ||
      !registrationData.email ||
      !registrationData.password ||
      !registrationData.confirmPass ||
      !registrationData.jobTitle
    ) {
      alert('Please fill all the fields!');
      return;
    }
    if (registrationData.password !== registrationData.confirmPass) {
      alert('Passwords do not match!');
      return;
    }
   
    // Get existing users or start with an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
     // Check if the email is registered
     const registered = existingUsers.find((user) => user.email === registrationData.email);

     if (registered) {
     alert('You are already registered. Please log in!');
       setIsRegistered(true); 
       
     return;
   }
    // Add new user to the list
    existingUsers.push(registrationData);
    // Save the updated list to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setIsRegistered(true);

    // Reset form state
    setRegistrationData({
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      jobTitle: '',
    });
  };

  // LOGIN FORM
  const loginOnSubmit = (e) => {
    e.preventDefault();
    console.log('User logged in:', loginData);

    // Get the users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user matching the entered email and password
    const foundUser = storedUsers.find((user) => {
      return (
        user.email === loginData.email && user.password === loginData.password
      );
    });

    if (foundUser) {
      // User found, log them in
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      alert('Login Successful!');
      navigate('/members'); // Redirect to profile page after login
    } else {
      // No matching user found, show an error
      alert('Invalid email or password. Please try again!');
    }

    // Clear login form fields
    setLoginData({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h3 className="title">
        Welcome to LinkedIn! A social network for professionals
      </h3>
      <div className="container">
        <div className="div1">
          <form className="form1" onSubmit={registerOnSubmit}>
            <p className="register-login">Register</p>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={registrationData.name}
              onChange={handleRegistrationChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={registrationData.password}
              onChange={handleRegistrationChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm pass"
              name="confirmPass"
              value={registrationData.confirmPass}
              onChange={handleRegistrationChange}
              required
            />
            <input
              type="text"
              placeholder="Job Title"
              name="jobTitle"
              value={registrationData.jobTitle}
              onChange={handleRegistrationChange}
              required
            />
            <div className="btn">
              <button type="submit">Register</button>
            </div>
          </form>

          {isRegistered && <p style={{textAlign:"center" ,margin:"30px", color:"green"}}>You are successfully registered! Please log in!</p>}
        </div>

        <div className="div2">
          <form className="form2" onSubmit={loginOnSubmit}>
            <p className="register-login">Login</p>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              placeholder="Your Password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <div className="btn">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
