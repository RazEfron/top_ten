import React, { useState } from "react";
import Page from "./components/Page";
import userContext from "./contexts/context";

const jwt_decode = require("jwt-decode");
const _ = require("lodash");

const apiUtil = require("./util/apiUtil");
const languageUtil = require("./util/validators");
const sendForm = require("./util/formUtil").sendForm;

function Console() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [language, setLanguage] = useState(localStorage.language);
  const [supportedLanguages, setSupportedLanguages] = useState(() => []);
  const [currentUrl, setUrlState] = useState(() => "");
  const [modalState, setModal] = useState({ isOpen: false });

  const [entitiesState, setEntities] = useState(() => ({
    dish: [],
    business: [],
    branch: [],
    list: [],
  }));

  const [formInfo, setFormInfo] = useState({
    entityName: currentUrl,
    entity: "",
    httpMethod: "post",
    foreignKeys: {},
  });

  if (_.isEmpty(supportedLanguages)) {
    apiUtil.get(
      "/language",
      {},
      (languages) => {
        setSupportedLanguages(_.map(languages, "language"));
      },
      (err) => console.log(err)
    );
  }

  function setUserAndAuth() {
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      localStorage.removeItem("jwtToken");
      localStorage.setItem("language", language);
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
    if (languageUtil.languageValidator(supportedLanguages, language)) {
      localStorage.setItem("language", language);
      setLanguage(localStorage.language);
    }
  }

  function prepareForm(formType, entity, name, foreignKeys) {
    setFormInfo({
      entityName: name,
      entity,
      httpMethod: formType,
      foreignKeys,
    });
    toggleModal();
  }

  function setCurrentUrl(url) {
    getAll(url, (entities) => {
      setEntities({ [url]: entities });
      setUrl(url);
    });
  }

  function getAll(path, onSuccess) {
    apiUtil.get(
      `/${path}/`,
      {},
      (entities) => onSuccess(entities),
      (err) => {
        console.log(err);
      }
    );
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
          supportedLanguages,
          getAll
        }}
      >
        <Page
          formInfo={formInfo}
          setFormInfo={setFormInfo}
          sendForm={sendForm}
          isAdmin={isAdmin}
          prepareForm={prepareForm}
          currentUrl={currentUrl}
          entitiesState={entitiesState}
          setEntities={setEntities}
          setCurrentUrl={setCurrentUrl}
        />
      </userContext.Provider>
    </>
  );
}

export default Console;
