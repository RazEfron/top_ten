import React, { useContext } from "react";

import Navbar from "./Navbar";
import userContext from "../contexts/context";
import Form from "./Form";
import DishItem from "./Dish/DishItem";
import BranchItem from "./Branch/BranchItem";
import BusinessItem from "./Business/BusinessItem";

const _ = require("lodash");
const fields = require("../fields/index");

function Page({
  formInfo,
  sendForm,
  isAdmin,
  prepareForm,
  currentUrl,
  entitiesState,
  setCurrentUrl,
}) {
  
  const { toggleModal, isModalOpen, language } = useContext(
    userContext
  );

  function dish() {
    setCurrentUrl("dish")
  }

  function branch() {
    setCurrentUrl("branch")
  }

  function business() {
    setCurrentUrl("business")
  }

  return (
    <div>
      <Navbar />
      <button onClick={dish}>Click dish</button>
      <button onClick={branch}>Click branch</button>
      <button onClick={business}>Click business</button>
      {isAdmin && currentUrl ? (
        <div>
          <button
            onClick={() => prepareForm("post", {})}
          >{`Create ${_.capitalize(currentUrl)}`}</button>
        </div>
      ) : (
        ""
      )}
      {currentUrl === "dish" &&
        _.map(entitiesState.dish, (dish) => {
          debugger;
          return (
            <DishItem
              dish={dish}
              isAdmin={isAdmin}
              prepareForm={prepareForm}
              language={language}
            />
          );
        })}
      {currentUrl === "branch" &&
        _.map(entitiesState.branch, (branch) => {
          return (
            <BranchItem
              branch={branch}
              isAdmin={isAdmin}
              prepareForm={prepareForm}
            />
          );
        })}
      {currentUrl === "business" &&
        _.map(entitiesState.business, (business) => {
          return (
            <BusinessItem
              business={business}
              isAdmin={isAdmin}
              prepareForm={prepareForm}
              language={language}
            />
          );
        })}
      {isModalOpen ? (
        <Form
          fields={fields[formInfo.entityName].fields(formInfo.entity, language)}
          formInfo={formInfo}
          title={formInfo.entityName}
          onSucces={[`set${_.capitalize(formInfo.entityName)}`]}
          callback={sendForm}
          isOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Page;
