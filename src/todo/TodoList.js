import React from "react";

const TodoList = props => (
  <ul>{props.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
);

export default TodoList;
