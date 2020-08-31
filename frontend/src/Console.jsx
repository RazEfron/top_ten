import React, { useState } from "react";
import Page from "./components/Page";
import userContext from "./contexts/context";

const jwt_decode = require("jwt-decode");
const apiUtil = require("./util/apiUtil");

function Console() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [language, setLanguage] = useState(localStorage.language);
  const [currentUrl, setUrlState] = useState(() => "/");
  const [modalState, setModal] = useState({ isOpen: false });
  const [dishesState, setDishes] = useState(() => []);
  const [formInfo, setFormInfo] = useState({
    entityName: currentUrl,
    entity: "",
    postOrPut: "post",
  });

  function setUserAndAuth() {
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      localStorage.removeItem("jwtToken");
      localStorage.setItem("language", "hebrew");
      setLanguage(localStorage.language);
      setUser({});
      setAuth(false);
      setAdmin(false);
    } else {
      localStorage.setItem("language", decodedUser.language);
      setLanguage(localStorage.language);
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

  function sendForm(formDetails) {
    if (formInfo.postOrPut === "post") {
      apiUtil[formInfo.postOrPut](
        `/${formInfo.entityName}`,
        formDetails,
        (data) => {
          setDishes([data]);
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      apiUtil[formInfo.postOrPut](
        `/${formInfo.entityName}/${formInfo.entity._id}`,
        formDetails,
        (data) => {
          setDishes([data]);
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  function toggleLanguage() {
    if (language === "hebrew") {
      localStorage.setItem("language", "english");
    } else {
      localStorage.setItem("language", "hebrew");
    }
    setLanguage(localStorage.language);
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
          toggleModal,
          language,
          toggleLanguage,
        }}
      >
        <Page
          formInfo={formInfo}
          setFormInfo={setFormInfo}
          sendForm={sendForm}
          dishesState={dishesState}
          setDishes={setDishes}
        />
      </userContext.Provider>
    </>
  );
}

export default Console;
