import React from "react";
const _ = require("lodash");

function DropDownInput({ options, onChange, value }) {
  return (
    <div>
      <select value={value} onChange={onChange}>
        {_.map(options, (option) => (
          <option value={option}>{_.capitalize(option)}</option>
        ))}
      </select>
    </div>
  );
}

export default DropDownInput;
