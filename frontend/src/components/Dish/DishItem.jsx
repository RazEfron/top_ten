import React from "react";

function DishItem({ dish, isAdmin, preperForm, language }) {
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
            <button
              onClick={() => preperForm("put", dish)}
            >{`Edit Dish`}</button>
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default DishItem;
