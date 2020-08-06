import React, { useContext } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import Navbar from "./Navbar"
import Footer from "./Footer";
import userContext from "../contexts/context";
import Form from "./Form";
import Dish from "./DishItem";
import DishForm from "./DishForm";

function Page() {
    const { currentUrl, setUrl } = useContext(userContext)
    
    function form() {
      setUrl("/form");
    }

    function dish() {
      setUrl("/dish");
    }

    let fields = [
      {
        type: "TextString",
        name: "someName",
        info: {
          hebrew: "hebrew",
          english: "english",
        },
      },
      {
        type: "TextString",
        name: "someName2",
        info: {
          hebrew: "hafuch",
          english: "upsidedown",
        },
      },
      {
        type: "Boolean",
        name: "isHidden",
        info: true,
      },
    ];

    return (
      <>
        <Navbar />
        <button onClick={form}>Click form</button>
        <button onClick={dish}>Click dish</button>
        <BrowserRouter>
          <Redirect to={currentUrl} />
          <Switch>
            <Route exact path="/form">
              <Form fields={fields} />
            </Route>
            <Route exact path="/dish">
              <DishForm />
            </Route>
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
}

export default Page;
