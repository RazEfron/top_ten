import React, { useContext } from "react";

import Login from "./LoginForm";
import userContext from "../contexts/context";

function Navbar() {
  let { admin, language, toggleLanguage } = useContext(userContext);
  
  return (
    <div>
      {language === "hebrew" && <button onClick={toggleLanguage}>English</button>}
      {language === "english" && <button onClick={toggleLanguage}>Hebrew</button>}
      {admin ? (
        <div>
          <div>Youre The admin</div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Navbar;
