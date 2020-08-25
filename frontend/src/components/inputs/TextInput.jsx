import React, { useEffect, useState, useContext } from "react";

function TextInput({ label, onChange, value }) {
  
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={e => {
            debugger
            onChange(label, e.target.value)}}
          placeholder={label}
        />
      </label>
    </div>
  );
}

export default TextInput;
