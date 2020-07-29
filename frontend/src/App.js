import React, { useState } from 'react';
import './App.css';
import Navbar from './components/navbar'
import userContext from './contexts/userContext';

const jwt_decode = require('jwt-decode')

function App() {
  
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({ isAuthenticated: false });

  if (localStorage.jwtToken) {
    const decodedUser = jwt_decode(localStorage.jwtToken);
    setUser(decodedUser);
    setAuth({ isAuthenticated: true })
    // const currentTime = Date.now() / 1000;
    // if (decodedUser.exp < currentTime) {
    //   // Logout the user and redirect to the login page
    //   // window.location.href = "/login";
    // }
  } 
  
  debugger
  return (
    <userContext.Provider value={{ user, auth }}>
      <Navbar/>
    </userContext.Provider>
  );
}

export default App;
