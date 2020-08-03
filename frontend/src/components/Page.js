import React, { useContext } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import Navbar from "./Navbar"
import Footer from "./Footer";
import userContext from "../contexts/context";
import One from "./TestsComponents/One";
import Two from "./TestsComponents/Two";
import Three from "./TestsComponents/Three";

function Page() {
    const { currentUrl, setUrl } = useContext(userContext)
    

    function one() {
        setUrl("/one")
    }
    function two() {
      setUrl("/two");
    }
    function three() {
      setUrl("/three");
    }
    debugger
    return (
      <>
        <Navbar />
        <button onClick={one}>Click one</button>
        <button onClick={two}>Click two</button>
        <button onClick={three}>Click three</button>
        <BrowserRouter>
          <Redirect to={currentUrl} />
          <Switch>
            <Route exact path="/one" component={One} />
            <Route exact path="/two" component={Two} />
            <Route exact path="/Three" component={Three} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
}

export default Page;
