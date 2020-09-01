import React from "react";

function BranchItem({ branch, isAdmin, prepareForm }) {
  const listStyle = {
    margin: "10px",
    border: "1px black solid",
    width: "150px",
  };

  return (
    <ul style={listStyle}>
      <li>
        <p>{branch.googlePlaceId}</p>
      </li>
      <li>
        {isAdmin ? (
          <div>
            <button
              onClick={() => prepareForm("put", branch)}
            >{`Edit Branch`}</button>
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
}

export default BranchItem;
