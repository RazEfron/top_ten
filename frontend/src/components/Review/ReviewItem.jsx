import React from "react";

function ReviewItem({ review, isAdmin, prepareForm, language }) {

  const listStyle = {
    margin: "10px",
    border: "1px black solid",
    width: "150px",
  };

  return (
    <ul style={listStyle}>
      <li>
        <p>{list.description[language]}</p>
      </li>
      <li>
        <p>{list.name[language]}</p>
      </li>
      <li>
        <p>{list.date}</p>
      </li>
      <li>
        <img
          src={list.image ? list.image.fileLink : ""}
          alt="Raz"
          style={imagestyle}
        ></img>
      </li>
      <li>
        {isAdmin ? (
          <div>
            <button
              onClick={() => prepareForm("put", list, "list", {})}
            >{`Edit List`}</button>
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default ReviewItem;
