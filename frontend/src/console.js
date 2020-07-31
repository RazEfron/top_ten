import React, { useState } from "react";
import Navbar from "./components/navbar";
import userContext from "./contexts/userContext";

const jwt_decode = require("jwt-decode");

function Console() {
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState({ isAuthenticated: false });

    function setUserAndAuth() {
      const decodedUser = jwt_decode(localStorage.jwtToken);
      setUser(decodedUser);
      setAuth({ isAuthenticated: true });
      const currentTime = Date.now() / 1000;
      if (decodedUser.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        setUser({});
        setAuth({ isAuthenticated: false });
      }
    }

    if (!auth.isAuthenticated && localStorage.jwtToken) {
      setUserAndAuth()
    };
    return (
      <userContext.Provider
        value={{
          user,
          auth,
          setContext: setUserAndAuth,
        }}
      >
        <Navbar />
      </userContext.Provider>
    );
}

export default Console;
