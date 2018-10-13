import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import Search from "./Search.js";
import Profile from "./Profile.js";
import "bootstrap/dist/css/bootstrap.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/:username" component={Profile} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
