import React, { Component } from "react";
import ProfileList from "./ProfileList.js";

class Follow extends Component {
  username = this.props.match.params.username;
  state = {
    profiles: [],
    loading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    await this.fetchFollowersData();
    this.setState({ loading: false });
  };

  fetchFollowersData() {
    const type = this.props.location.state.type;
    const api = `https://api.github.com/users/${this.username}/${type}`;
    fetch(api)
      .then(response => response.json())
      .then(data => {
        if (data.length !== 0) {
          this.setState({
            profiles: data
          });
        }
      });
  }

  render() {
    if (this.state.loading) return <div>loading. . .</div>;

    return (
      <div>
        <h3>{this.props.location.state.type}</h3>
        <ProfileList profileListData={this.state.profiles} />
      </div>
    );
  }
}

export default Follow;
