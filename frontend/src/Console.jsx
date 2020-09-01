import React, { useState } from "react";
import Page from "./components/Page";
import userContext from "./contexts/context";

const jwt_decode = require("jwt-decode");
const apiUtil = require("./util/apiUtil");
const languageUtil = require("./util/language");
const sendForm = require("./util/formUtil").sendForm;

function Console() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [language, setLanguage] = useState(localStorage.language);
  const [currentUrl, setUrlState] = useState(() => "");
  const [modalState, setModal] = useState({ isOpen: false });

  const [dishesState, setDish] = useState(() => []);
  const [branchesState, setBranch] = useState(() => []);
  const [businessState, setBusiness] = useState(() => []);

  const [formInfo, setFormInfo] = useState({
    entityName: currentUrl,
    entity: "",
    httpMethod: "post",
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

  function changeLanguage(language) {
    if (languageUtil.languageValidator(language)) {
      localStorage.setItem("language", language);
      setLanguage(localStorage.language);
    } 
  }

  function prepareForm(formType, dish) {
    setFormInfo({
      entityName: currentUrl,
      entity: dish,
      httpMethod: formType,
    });
    toggleModal();
  }

  return (
    <>
      <userContext.Provider
        value={{
          user,
          auth,
          isAdmin,
          currentUrl,
          setUrl,
          setAuthContext: setUserAndAuth,
          isModalOpen: modalState.isOpen,
          toggleModal,
          language,
          changeLanguage,
        }}
      >
        <Page
          formInfo={formInfo}
          setFormInfo={setFormInfo}
          sendForm={sendForm}
          dishesState={dishesState}
          setDish={setDish}
          branchesState={branchesState}
          setBranch={setBranch}
          businessState={businessState}
          setBusiness={setBusiness}
          isAdmin={isAdmin}
          prepareForm={prepareForm}
          currentUrl={currentUrl}
        />
      </userContext.Provider>
    </>
  );
}

export default Console;
