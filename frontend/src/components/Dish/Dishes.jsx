import React from "react";
import DishItem from "./DishItem";
const _ = require("lodash");

function Dishes({ dishes, isAdmin, prepareForm, language }) {
  return (
    <div>
      {_.map(dishes, (dish) => {
        return (
          <DishItem
            dish={dish}
            isAdmin={isAdmin}
            prepareForm={prepareForm}
            language={language}
          />
        );
      })}
    </div>
  );
}

export default Dishes;
