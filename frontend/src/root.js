import React from "react";
import { HashRouter } from "react-router-dom";
import App from "./App";

function Root() {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    );
}

export default Root;
