import React, { Component } from "react";
import Todo from "./Todo.js";
import "./App.css";

class App extends Component {
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
        <p>Add a new Todo</p>
        <form onSubmit={this.addItem}>
          <input
            value={this.state.term}
            placeholder="Task"
            onChange={this.onChange}
          />
          <button type="submit">Add</button>
        </form>

        <Todo items={this.state.items} />
      </div>
    );
  }
}

export default App;
