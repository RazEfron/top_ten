import React from "react";

function BooleanInput({ label, onChange, value }) {
  debugger
  return (
    <div>
      <label>
        {label}
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => {
            onChange(label, e.target.checked);
          }}
          placeholder={label}
        />
      </label>
    </div>
  );
}

export default BooleanInput;
