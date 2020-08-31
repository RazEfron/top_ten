import React, { useContext } from "react";
import DishItem from "./DishItem";
import userContext from "../../contexts/context";

const _ = require("lodash");

function DishIndex({ setFormInfo, dishesState }) {
  const { toggleModal, language, isAdmin } = useContext(userContext);

  function preperForm(formType, dish) {
    setFormInfo({
      entityName: "dish",
      entity: dish,
      postOrPut: formType,
    });
    toggleModal();
  }

  return (
    <div>
      {isAdmin ? (
        <div>
          <button
            onClick={() => preperForm("post", {})}
          >{`Create Dish`}</button>
        </div>
      ) : (
        ""
      )}
      {_.map(dishesState, (dish) => (
        <DishItem
          dish={dish}
          isAdmin={isAdmin}
          preperForm={preperForm}
          language={language}
        />
      ))}
    </div>
  );
}

export default DishIndex;
