import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Following from "./Following.js";
import Followers from "./Followers.js";
import Repos from "./Repos.js";
import Search from "./Search.js";

class Profile extends Component {
  state = {
    profileData: {},
    username: this.props.match.params.username,
    repositoryData: [],
    loading: true,
    word: ""
  };

  componentDidMount() {
    this.fetchData();
    console.log("mounted");
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        username: nextProps.match.params.username
      },
      () => {
        this.fetchData();
      }
    );
  }

  fetchData = async () => {
    this.setState({ loading: true });
    await this.fetchProfileData();
    this.setState({ loading: false });
  };

  fetchProfileData() {
    const api = `https://api.github.com/users/${this.state.username}`;
    fetch(api)
      .then(response => response.json())
      .then(data => {
        if (data.length !== 0) {
          this.setState({
            profileData: data
          });
        }
      });
  }

  renderProfile() {
    return (
      <div>
        <img src={this.state.profileData.avatar_url} height="200" />
        <p>name: {this.state.profileData.name}</p>
        <p>About: {this.state.profileData.bio}</p>
        <p>
          <Link to={`/${this.state.username}/repo`}>Repositories</Link> :
          {this.state.profileData.public_repos}
        </p>
        <p>
          <Link to={`/${this.state.username}/followers`}>Followers</Link> :
          {this.state.profileData.followers}
        </p>
        <p>
          <Link to={`/${this.state.username}/following`}>Following</Link> :
          {this.state.profileData.following}
        </p>
        <p>location: {this.state.profileData.location}</p>
        <p>Join Date: {this.state.profileData.created_at}</p>
        <p>
          <a href={this.state.profileData.html_url} target="_blank">
            Link
          </a>
        </p>
      </div>
    );
  }

  render() {
    if (this.state.loading) return <div>loading. . .</div>;

    return (
      <div>
        <Link to="/">Go to Search</Link>
        <Search />
        <h2>{this.username}</h2>
        {this.renderProfile()}
        <Route path="/:username/repo" component={Repos} />
        <Route path="/:username/following" component={Following} />
        <Route path="/:username/followers" component={Followers} />
      </div>
    );
  }
}

export default Profile;
