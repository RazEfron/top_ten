import React from "react";

function ListItem({ dish, isAdmin, prepareForm, language }) {
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
        {isAdmin ? (
          <div>
            <button
              onClick={() => prepareForm("put", dish, "dish", {})}
            >{`Edit Dish`}</button>
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default ListItem;
