import React, { useContext } from "react";

import Login from "./LoginForm";
import userContext from "../contexts/context";

function Navbar() {
  let { isAdmin, language, changeLanguage } = useContext(userContext);

  return (
    <div>
      {language === "hebrew" && (
        <div>
          <button onClick={() => changeLanguage("english")}>English</button>
          <span>Hebrew</span>
        </div>
      )}
      {language === "english" && (
        <div>
          <span>English</span>
          <button onClick={() => changeLanguage("hebrew")}>Hebrew</button>
        </div>
      )}
      {isAdmin ? (
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
