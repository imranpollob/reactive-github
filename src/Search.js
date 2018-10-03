import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProfileList from "./ProfileList.js";

class Search extends Component {
  state = {
    profiles: [],
    term: ""
  };

  searchProfile = event => {
    event.preventDefault();
    this.setState({
      profiles: []
    });
    const api = `https://api.github.com/search/users?q=${
      this.state.term
    }&per_page=10`;

    fetch(api)
      .then(response => response.json())
      .then(data => {
        if (data.items.length !== 0) {
          data.items.map((value, index) => {
            this.setState({
              profiles: [...this.state.profiles, value]
            });
          });
        }
      })
      .catch(error => console.log(error));
  };

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  renderInputForm = () => {
    return (
      <form onSubmit={this.searchProfile}>
        <input
          value={this.state.term}
          placeholder="Profile"
          onChange={this.onChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  };

  render() {
    return (
      <div>
        <p>Search</p>
        {this.renderInputForm()}
        <ProfileList profileListData={this.state.profiles} />
      </div>
    );
  }
}

export default Search;
