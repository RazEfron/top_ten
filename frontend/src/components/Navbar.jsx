import React, { useContext } from "react";

import Login from "./LoginForm";
import DropDown from "./inputs/DropDownInput"
import userContext from "../contexts/context";

function Navbar() {
  let { isAdmin, auth, language, changeLanguage, supportedLanguages } = useContext(userContext);
  
  return (
    <div>
      {
        <DropDown
          options={supportedLanguages}
          onChange={changeLanguage}
          value={language}
        />
      }
      {isAdmin ? (
        <div>
          <div>Youre The admin</div>
        </div>
      ) : (auth ? <div>Youre a user</div> :
        <Login />
      )}
    </div>
  );
}

export default Navbar;
