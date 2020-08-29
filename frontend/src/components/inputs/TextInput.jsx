import React from "react";

function TextInput({ label, onChange, value }) {
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
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

export default TextInput;
