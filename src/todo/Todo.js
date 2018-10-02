import React, { Component } from "react";
import TodoList from "./TodoList.js";

class Todo extends Component {
  state = {
    items: [],
    term: ""
  };
  addItem = event => {
    event.preventDefault();
    this.setState({
      term: "",
      items: [...this.state.items, this.state.term]
    });
  };

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <p>Add a new TodoList</p>
        <form onSubmit={this.addItem}>
          <input
            value={this.state.term}
            placeholder="Task"
            onChange={this.onChange}
          />
          <button type="submit">Add</button>
        </form>

        <TodoList items={this.state.items} />
      </div>
    );
  }
}

export default Todo;
