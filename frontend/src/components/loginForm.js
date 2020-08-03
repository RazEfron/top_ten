import React, { useState, useContext } from "react";

import userContext from '../contexts/context';

const apiUtil = require('../util/apiUtil')

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(userContext);

  function handleSubmit(e) {
    
    e.preventDefault();
    localStorage.removeItem("jwtToken");
    const user = {
        email,
        password
    }
    
    apiUtil.post('/user/login', user, handleSucces, handleError)
  }

  function handleSucces(token) {
    if (token.token) {
      localStorage.setItem("jwtToken", token.token);
      context.setAuthContext();
    }
  }

  function handleError(err) {
      
      console.log(err)
  }
  
  return (
    <>
      <form>
        <label>Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        </label>
        <label>Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          />
          </label>
          <button onClick={handleSubmit}>
              LOGIN
          </button>
      </form>
    </>
  );
}

export default Login;
