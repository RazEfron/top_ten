import React from "react";
const formUtil = require("../../util/formUtil")

function DateInput({ label, onChange, value }) {
  return (
    <div>
      <label>
        {label}
        <input
          type="date"
          value={formUtil.formatDate(value)}
          onChange={(e) => {
            onChange(label, e.target.value);
          }}
          placeholder={label}
        />
      </label>
    </div>
  );
}

export default DateInput;
