import React, { useContext, useState } from "react";

import Navbar from "./Navbar";
import userContext from "../contexts/context";
import Form from "./Form";
import DishIndex from "./Dish/DishIndex";

const fields = require("../fields/index");
const apiUtil = require("../util/apiUtil");

function Page() {
  const { currentUrl, setUrl, toggleModal, isModalOpen } = useContext(
    userContext
  );
  const [formInfo, setFormInfo] = useState({
    entityName: "dish",
    entity: "",
    postOrPut: "post",
  });

  function dish() {
    debugger;
    setUrl("/dish");
  }

  function sendForm(formDetails) {
    debugger
    if (formInfo.postOrPut === "post") {
      apiUtil[formInfo.postOrPut](
        `/${formInfo.entityName}`,
        formDetails,
        (data) => {
          debugger
          console.log(data);
        },
        (err) => {
          debugger
          console.log(err);
        }
      );
    } else {
      apiUtil[formInfo.postOrPut](
        `/${formInfo.entityName}/${formInfo.entity._id}`,
        formDetails,
        (data) => {
          debugger
          console.log(data);
        },
        (err) => {
          debugger
          console.log(err);
        }
      );
    }
  }

  return (
    <div>
      <Navbar />
      <button onClick={dish}>Click dish</button>
      {currentUrl === "/dish" && <DishIndex setFormInfo={setFormInfo} />}
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
