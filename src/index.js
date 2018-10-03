import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Center from "./routeme/Center.js";
import Todo from "./todo/Todo.js";
import "./index.css";
import Search from "./Search.js";
import Profile from "./Profile.js";
import Follow from "./Follow.js";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/:username/followers" component={Follow} />
      <Route path="/:username" component={Profile} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
