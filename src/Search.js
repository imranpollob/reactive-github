import React, { Component } from "react";

class Search extends Component {
  state = {
    profiles: [],
    term: ""
  };

  searchProfile = event => {
    event.preventDefault();
    fetch(
      `https://api.github.com/search/users?q=${this.state.term}&per_page=10`
    )
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

  render() {
    return (
      <div>
        <p>Search</p>
        <form onSubmit={this.searchProfile}>
          <input
            value={this.state.term}
            placeholder="Profile"
            onChange={this.onChange}
          />
          <button type="submit">Search</button>
        </form>

        {this.state.profiles.map(data => (
          <div>
            <img src={data.avatar_url} height="100" />
            <p>{data.login}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
