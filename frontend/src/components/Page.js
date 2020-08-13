import React, { useContext, useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import Navbar from "./Navbar"
import Footer from "./Footer";
import userContext from "../contexts/context";
import Form from "./Form";
import DishForm from "./Dish/DishForm";
import DishIndex from "./Dish/DishIndex";

function Page() {
    const { currentUrl, setUrl } = useContext(userContext)
    const [formInfo, setFormInfo] = useState({});
    const [formCallback, setFormCallback] = useState("");

    function dish() {
      setUrl("/dish");
    }

    return (
      <>
        <Navbar />
        <button onClick={dish}>Click dish</button>
        <BrowserRouter>
          <Redirect to={currentUrl} />
          <Switch>
            <Route exact path="/form">
              <Form fields={formInfo} callback={formCallback} />
            </Route>
            <Route exact path="/dish">
              <DishIndex
                setFormInfo={setFormInfo}
                setFormCallback={setFormCallback}
              />
            </Route>
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
}

export default Page;
