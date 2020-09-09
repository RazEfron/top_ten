import React, { useContext } from "react";

import Navbar from "./Navbar";
import userContext from "../contexts/context";
import Form from "./Form";
import Businesses from "./Business/Busineeses";
import Branches from "./Branch/Branches";
import Dishes from "./Dish/Dishes";
import Lists from "./List/Lists";

const _ = require("lodash");
const fields = require("../fields/index");
const validator = require("../util/validators");

function Page({
  formInfo,
  sendForm,
  isAdmin,
  prepareForm,
  currentUrl,
  entitiesState,
  setEntities,
  setCurrentUrl,
}) {
  const { toggleModal, isModalOpen, language, getAll } = useContext(userContext);

  function dish() {
    setCurrentUrl("dish");
  }

  function branch() {
    setCurrentUrl("branch");
  }

  function business() {
    setCurrentUrl("business");
  }

  function list() {
    setCurrentUrl("list");
  }

  return (
    <div>
      <Navbar />
      <button onClick={dish}>Click dish</button>
      <button onClick={branch}>Click branch</button>
      <button onClick={business}>Click business</button>
      <button onClick={list}>Click list</button>
      {isAdmin && !validator.hasForeignKeys(currentUrl) ? (
        <div>
          <button
            onClick={() => prepareForm("post", {}, currentUrl, {})}
          >{`Create ${_.capitalize(currentUrl)}`}</button>
        </div>
      ) : (
        ""
      )}
      {currentUrl === "dish" && (
        <Dishes
          dishes={entitiesState.dish}
          isAdmin={isAdmin}
          prepareForm={prepareForm}
          language={language}
        />
      )}
      {currentUrl === "branch" && (
        <Branches
          branches={entitiesState.branch}
          isAdmin={isAdmin}
          prepareForm={prepareForm}
          language={language}
        />
      )}
      {currentUrl === "business" && (
        <Businesses
          businesses={entitiesState.business}
          isAdmin={isAdmin}
          prepareForm={prepareForm}
          language={language}
        />
      )}
      {currentUrl === "list" && (
        <Lists
          lists={entitiesState.list}
          isAdmin={isAdmin}
          prepareForm={prepareForm}
          language={language}
        />
      )}
      {isModalOpen ? (
        <Form
          fields={fields[formInfo.entityName].fields(formInfo.entity, language)}
          formInfo={formInfo}
          title={formInfo.entityName}
          callback={sendForm}
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          setEntities={setEntities}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Page;
