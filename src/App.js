
import './App.css';
import React,{ useState } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import NotFound from './components/NotFound';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem('LoggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;

  });
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route
            path="/feed"
            element={
              loggedInUser ? (
                <HomePage user={loggedInUser}  onLogout={() => setLoggedInUser(null)} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              loggedInUser ? (
                <Navigate to="/feed" />
              ) : (
                <LoginForm onLogin={setLoggedInUser} />
              )
            }
          />
          <Route
            path="/registration"
            element={loggedInUser ? <Navigate to="/feed" /> : <RegistrationForm />}
          />
          
          <Route path="/*" element={<NotFound />} />
        </Routes>
      
      
      </BrowserRouter>

    </div>
  )
}

export default App;
