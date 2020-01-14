import React, { Component } from "react";
import ProfileList from "./ProfileList.js";
import { Button, Form, Input } from "reactstrap";

import "./Search.css";

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
    const api = `https://api.github.com/search/users?q=${this.state.term}&per_page=12`;

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
      <div className="input-form">
        <h4>Git Me</h4>
        <Form inline onSubmit={this.searchProfile}>
          <Input
            type="text"
            placeholder="Profile"
            value={this.state.term}
            onChange={this.onChange}
          />

          <Button type="submit" color="primary">
            Search
          </Button>
        </Form>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderInputForm()}
        <br />
        <ProfileList profileListData={this.state.profiles} />
      </div>
    );
  }
}

export default Search;
