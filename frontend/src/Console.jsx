import React, { useState } from "react";
import Page from "./components/Page";
import userContext from "./contexts/context";

const jwt_decode = require("jwt-decode");

function Console(props) {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [currentUrl, setUrlState] = useState(() => "/");
  const [modalState, setModal] = useState({ isOpen: false });


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
    setUrlState(url);
  }

  if (!auth && localStorage.jwtToken) {
    setUserAndAuth();
  }

  function toggleModal() {
    
    setModal({ isOpen: !modalState.isOpen });
  }

  return (
    <>
        <userContext.Provider
          value={{
            user,
            auth,
            admin,
            currentUrl,
            setUrl,
            setAuthContext: setUserAndAuth,
            isModalOpen: modalState.isOpen,
            toggleModal: toggleModal
          }}
        >
          <Page  />
        </userContext.Provider>
    </>
  );
}

export default Console;
