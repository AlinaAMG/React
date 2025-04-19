import './App.css';
import React, { useState, useEffect } from 'react';

import MessageDetails from './components/MessageDetails';
import Messages from './components/Messages';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocalMessagesDetails from './components/LocalMessages';
import RegistrationForm from './components/RegistrationForm';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem('LoggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;

  });

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              loggedInUser ? (
                <Messages user={loggedInUser}  onLogout={() => setLoggedInUser(null)} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              loggedInUser ? (
                <Navigate to="/" />
              ) : (
                <LoginForm onLogin={setLoggedInUser} />
              )
            }
          />
          <Route path="/message/:id" element={<MessageDetails />} />
          <Route path="/local-message/:id" element={<LocalMessagesDetails />} />
          <Route
            path="/registration"
            element={loggedInUser ? <Navigate to="/" /> : <RegistrationForm />}
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
