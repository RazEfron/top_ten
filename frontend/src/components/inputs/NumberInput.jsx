import React from "react";

function NumberInput({ label, onChange, value }) {
  return (
    <div>
      <label>
        {label}
        <input
          type="number"
          value={value}
          onChange={(e) => {
            onChange(label, e.target.value);
          }}
          placeholder={label}
        />
      </label>
    </div>
  );
}

export default NumberInput;
