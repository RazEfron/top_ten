import React, { useContext, useState } from "react";

import Navbar from "./Navbar";
import userContext from "../contexts/context";
import Form from "./Form";
import DishIndex from "./Dish/DishIndex";

const fields = require("../fields/index");
const apiUtil = require("../util/apiUtil");

function Page({ dishesState, setDishes, formInfo, setFormInfo, sendForm }) {
  const { currentUrl, setUrl, toggleModal, isModalOpen } = useContext(
    userContext
  );

  function dish() {
    apiUtil.get(
      "/dish/",
      {},
      (dishes) => {
        setDishes(dishes);
        setUrl("/dish");
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
      {currentUrl === "/dish" && (
        <DishIndex
          setFormInfo={setFormInfo}
          dishesState={dishesState}
          setDishes={setDishes}
        />
      )}
      {isModalOpen ? (
        <Form
          fields={fields[formInfo.entityName].fields(formInfo.entity)}
          title={formInfo.entityName}
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
