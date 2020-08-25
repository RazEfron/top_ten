import React, { useContext } from "react";

import Login from "./LoginForm";
import userContext from "../contexts/context";
import { divide } from "lodash";

function Navbar() {
  let user = useContext(userContext);

  return (
    <div>
      {user.admin ? (
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
