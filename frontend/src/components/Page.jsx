import React, { useContext } from "react";

import Navbar from "./Navbar";
import userContext from "../contexts/context";
import Form from "./Form";
import DishItem from "./Dish/DishItem";
import BranchItem from "./Branch/BranchItem";
import BusinessItem from "./Business/BusinessItem";

const _ = require("lodash")
const fields = require("../fields/index");
const apiUtil = require("../util/apiUtil");

function Page({
  dishesState,
  setDish,
  formInfo,
  sendForm,
  setBranch,
  branchesState,
  businessState,
  setBusiness,
  isAdmin,
  prepareForm,
  currentUrl
}) {
  const { setUrl, toggleModal, isModalOpen, language } = useContext(
    userContext
  );

  function dish() {
    apiUtil.get(
      "/dish/",
      {},
      (dishes) => {
        debugger
        setDish(dishes);
        setUrl("dish");
        debugger
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function branch() {
    apiUtil.get(
      "/branch/",
      {},
      (branches) => {
        debugger
        setBranch(branches);
        setUrl("branch");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function business() {
    apiUtil.get(
      "/business/",
      {},
      (businesses) => {
        debugger;
        setBusiness(businesses);
        setUrl("business");
      },
      (err) => {
        console.log(err);
      }
    );
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
        _.map(dishesState, (dish) => {
          debugger
          return <DishItem
            dish={dish}
            isAdmin={isAdmin}
            prepareForm={prepareForm}
            language={language}
          />
      })}
      {currentUrl === "branch" &&
        _.map(branchesState, (branch) => {
          return (
            <BranchItem
              branch={branch}
              isAdmin={isAdmin}
              prepareForm={prepareForm}
            />
          );
        })}
      {currentUrl === "business" &&
        _.map(businessState, (business) => {
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
