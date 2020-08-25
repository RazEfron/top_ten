import React from "react";

function Modal({ isOpen, toggleModal, children }) {
  
  if (!isOpen) {
    
    return null;
  }

  let blackoutStyle = {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgb(0,0,0)",
    opacity: 0.2,
  };

  let modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fefefe",
    margin: "auto",
    padding: 0,
    border: "1px solid #888",
    width: "500px",
    minHeight: "450px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
    overflow: "visible",
    zIndex: "900",
    borderRadius: "5px",
    border: "none",
  };

  return (
    <>
      <div style={blackoutStyle} onClick={toggleModal}></div>
      <div style={modalStyle}>
        {children}
        <button onClick={toggleModal}>Cancel</button>
      </div>
    </>
  );
}

export default Modal;
