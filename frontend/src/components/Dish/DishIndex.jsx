import React, { useContext } from "react";
import DishItem from "./DishItem";
import userContext from "../../contexts/context";

const _ = require("lodash");

function DishIndex({ setFormInfo, setFormCallback, dishesState, setDishes }) {
  const isAdmin = useContext(userContext).admin;

  return (
    <div>
      {_.map(dishesState, (dish) => (
        <DishItem
          dish={dish}
          isAdmin={isAdmin}
          formType={"edit"}
          setFormInfo={setFormInfo}
          setFormCallback={setFormCallback}
        />
      ))}
    </div>
  );
}

export default DishIndex;
