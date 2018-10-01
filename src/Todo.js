import React from "react";

const Todo = props => (
  <ul>{props.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
);

export default Todo;
