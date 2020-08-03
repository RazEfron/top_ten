import React, { useState } from "react";
import Page from "./components/Page";
import userContext from "./contexts/userContext";

const jwt_decode = require("jwt-decode");

function Console() {
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(false);

    function setUserAndAuth() {
      const decodedUser = jwt_decode(localStorage.jwtToken);
      setUser(decodedUser);
      setAuth(true);
      setAdmin(decodedUser.isAdmin);
      const currentTime = Date.now() / 1000;
      if (decodedUser.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        setUser({});
        setAuth(false);
        setAdmin(false);
      }
    }

    if (!auth && localStorage.jwtToken) {
      setUserAndAuth()
    };
    return (
      <userContext.Provider
        value={{
          user,
          auth,
          admin,
          setContext: setUserAndAuth,
        }}
      >
      <Page />
      </userContext.Provider>
    );
}

export default Console;
