import React, { useContext } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Navbar from "./Navbar"
import Footer from "./Footer";
import userContext from "../contexts/context";

function Page() {
    const { currentUrl, setUrl } = useContext(userContext)
    debugger

    return (
        <>
        <Navbar />
        <BrowserRouter>
            <Switch>
            <Route />
            </Switch>
        </BrowserRouter>
        <Footer />
        </>
    );
}

export default Page;
