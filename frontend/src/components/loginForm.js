import React, { useState } from "react";

const apiUtil = require('../../util/apiUtil')

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    const user = {
        email,
        password
    }

    fetch
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
      </form>
    </>
  );
}

export default Login;
