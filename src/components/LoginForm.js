import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find((user) => {
      return (
        user.email === userInput.email && user.password === userInput.password
      );
    });

    if (foundUser) {
      localStorage.setItem('LoggedInUser', JSON.stringify(foundUser));
      alert('Login Successfull!');

      onLogin(foundUser);
      navigate('/');
    } else {
      alert('Invalid email or password.Please try again!');
    }
    // Clear the inputs

    setUserInput({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <form className="login-registration-form" onSubmit={handleSubmit}>
        <h3 className="title">Sign In to TimeLine</h3>
        <input
          type="email"
          name="email"
          value={userInput.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={userInput.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <p className="link">
          Don't Have an account? <Link to="/registration">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
