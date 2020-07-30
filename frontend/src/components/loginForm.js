import React, { useState } from "react";

const apiUtil = require('../util/apiUtil')

function Login(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    debugger
    e.preventDefault();
    localStorage.removeItem("jwtToken");
    const user = {
        email,
        password
    }
    debugger
    // fetch("user/register", {
    //   method: "POST",
    //   body: JSON.stringify(user),
    // })
    //   .then((user) => console.log(user))
    //   .catch((err) => console.log(err));
    apiUtil.post('/user/login', user, handleSucces, handleError)
  }

  function handleSucces(token) {
    debugger
    localStorage.setItem("jwtToken", token.token);
  }

  function handleError(err) {
      debugger
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
          type="text"
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
