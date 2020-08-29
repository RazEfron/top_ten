import React, { useState, useEffect, useContext } from "react";
import userContext from "../../contexts/context";

const _ = require("lodash");

const apiUtil = require("../../util/apiUtil");

function DishItem({ formType, dish, isAdmin, setFormInfo }) {
  const { setUrl, toggleModal } = useContext(userContext);

  function preperForm() {
    debugger;
    setFormInfo({
      entityName: "dish",
      entity: dish,
      postOrPut: formType === "edit" ? "put" : "post",
    });
    toggleModal();
  }

  const imagestyle = {
    height: "90px",
    width: "90px",
  };

  const listStyle = {
    margin: "10px",
    border: "1px black solid",
    width: "150px",
  };

  return (
    <ul style={listStyle}>
      <li>
        <p>{dish.description.english}</p>
      </li>
      <li>
        <p>{dish.name.english}</p>
      </li>
      <li>
        <p>{dish.price}</p>
      </li>
      <li>
        <img
          src={dish.image ? dish.image.fileLink : ""}
          alt="Raz"
          style={imagestyle}
        ></img>
      </li>
      <li>
        {isAdmin ? (
          <div>
            <button onClick={preperForm}>{`${formType} Dish`}</button>
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default DishItem;
