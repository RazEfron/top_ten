import React, { useEffect, useState, useContext } from "react";
import DishItem from "./DishItem";
import userContext from "../../contexts/context";

const _ = require("lodash");

const apiUtil = require("../../util/apiUtil");


function DishIndex(props) {
  const [dishesState, setDishes] = useState(() => [])
  const isAdmin = useContext(userContext).admin;

  function getDishesSucces(dishes) {
      
      let array = [];
      array.push(<DishItem isAdmin={isAdmin} formType={"new"} setFormInfo={props.setFormInfo} setFormCallback={props.setFormCallback} />);
    _.forEach(dishes, dish => {
        
        array.push(<DishItem dish={dish} isAdmin={isAdmin} formType={"edit"} setFormInfo={props.setFormInfo} setFormCallback={props.setFormCallback} />);
    })
    setDishes(array)
  }

  useEffect(() => {
    
    apiUtil.get("/dish/", {}, getDishesSucces, (err) => {
      console.log(err);
    });
  }, []);



  return (
    <>
      <ul>
          {dishesState}
      </ul>
    </>
  );
}

export default DishIndex;
