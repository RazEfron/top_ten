import React from "react";
import userContext from "../contexts/userContext";
import { Switch, Route, Router } from "react-router-dom"

import Navbar from "./Navbar"

function Page() {
debugger
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default Page;
