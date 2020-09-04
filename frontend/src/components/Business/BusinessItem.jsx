import React from "react";

function BusinessItem({ business, isAdmin, prepareForm, language }) {
  ;
  const listStyle = {
    margin: "10px",
    border: "1px black solid",
    width: "150px",
  };

  return (
    <ul style={listStyle}>
      <li>
        <p>{business.displayName[language]}</p>
      </li>
      <li>
        <p>{business.description[language]}</p>
      </li>
      <li>
        {isAdmin ? (
          <div>
            <button
              onClick={() => prepareForm("put", business, "business", {})}
            >{`Edit business`}</button>
            <button
              onClick={() =>
                prepareForm("post", {}, "branch", { businessId: business._id })
              }
            >{`Create Branch`}</button>
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default BusinessItem;