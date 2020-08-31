import React, { useContext } from "react";
import userContext from "../../contexts/context";

function DishItem({ formType, dish, isAdmin, setFormInfo }) {
  const { toggleModal, language } = useContext(userContext);

  function preperForm() {
    ;
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
        <p>{dish.description[language]}</p>
      </li>
      <li>
        <p>{dish.name[language]}</p>
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
