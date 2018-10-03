import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Following from "./Following.js";
import Followers from "./Followers.js";
import Repos from "./Repos.js";

class Profile extends Component {
  username = this.props.match.params.username;
  state = {
    profileData: {},
    repositoryData: [],
    loading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    await this.fetchProfileData();
    await this.fetchReposioryData();
    this.setState({ loading: false });
  };

  fetchProfileData() {
    const api = `https://api.github.com/users/${this.username}`;
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

  fetchReposioryData() {
    const api = `https://api.github.com/users/${
      this.username
    }/repos?sort=pushed`;
    fetch(api)
      .then(response => response.json())
      .then(data => {
        console.log(data.length);
        if (data.length !== 0) {
          this.setState({ repositoryData: data });
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
          <Link to={`/${this.username}/repo`}>Repositories</Link> :
          {this.state.profileData.public_repos}
        </p>
        <p>
          <Link to={`/${this.username}/followers`}>Followers</Link> :
          {this.state.profileData.followers}
        </p>
        <p>
          <Link to={`/${this.username}/following`}>Following</Link> :
          {this.state.profileData.following}
        </p>
        <p>location: {this.state.profileData.location}</p>
        <p>Join Date: {this.state.profileData.created_at}</p>
      </div>
    );
  }

  renderRepositorySummary() {
    return (
      <div>
        <h2>Repositories</h2>
        {this.state.repositoryData.map(repo => (
          <div key={repo.id}>
            <h3>name: {repo.name}</h3>
            <p>description: {repo.description}</p>
            <p>stars: {repo.stargazers_count}</p>
            <p>language: {repo.language}</p>
            <p>forks: {repo.forks_count}</p>
            <p>
              url:{" "}
              <a href={repo.html_url} target="_blank">
                {repo.name}
              </a>
            </p>
            <p>last update: {repo.updated_at}</p>
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.loading) return <div>loading. . .</div>;

    return (
      <div>
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
