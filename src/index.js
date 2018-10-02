import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Search from "./Search.js";
import Center from "./routeme/Center.js";
import Todo from "./todo/Todo.js";
import "./index.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Search />
  </BrowserRouter>,
  rootElement
);
