import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom"
import Page from "./components/Page";
import userContext from "./contexts/context";

const jwt_decode = require("jwt-decode");

function Console(props) {
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [currentUrl, setUrlState] = useState(() => '/');

    function setUserAndAuth() {
      const decodedUser = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decodedUser.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        setUser({});
        setAuth(false);
        setAdmin(false);
      } else {
        setUser(decodedUser);
        setAuth(true);
        setAdmin(decodedUser.isAdmin);
      }
    }

    function setUrl(url) {
      setUrlState(url)
  }

    if (!auth && localStorage.jwtToken) {
      setUserAndAuth()
    };
    return (
      <>
        <BrowserRouter>
          <userContext.Provider
            value={{
              user,
              auth,
              admin,
              currentUrl,
              setUrl,
              setAuthContext: setUserAndAuth,
            }}
          >
            <Page />
          </userContext.Provider>
        </BrowserRouter>
      </>
    );
}

export default Console;