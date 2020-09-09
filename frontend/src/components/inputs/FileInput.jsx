import React from "react";

function FileInput({ label, onChange, value }) {
  const imagestyle = {
    height: "90px",
    width: "90px",
  };
  return (
    <div>
      <label>
        {label}
        <input
          type="file"
          onChange={(e) => {
            onChange(label, e.target.files[0]);
          }}
        />
        {label === "image" ? <img
          src={typeof value === "object" ? URL.createObjectURL(value) : value}
          style={imagestyle}
          alt="Raz"
        />: ""}
      </label>
    </div>
  );
}

export default FileInput;
