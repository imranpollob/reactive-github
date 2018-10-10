import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Following from "./Following.js";
import Followers from "./Followers.js";
import Repos from "./Repos.js";
import Search from "./Search.js";
import "./Profile.css";
import { Container } from "reactstrap";

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
        <div class="profile">
          <div class="profile-image">
            <img src={this.state.profileData.avatar_url} />
          </div>
          <div class="profile-description">
            <div class="profile-left">
              <h3>{this.state.profileData.name}</h3>
              <p>{this.state.profileData.bio}</p>
            </div>
            <div class="profile-right">
              <div class="">
                <a href={this.state.profileData.html_url} target="_blank">
                  Visit
                </a>
              </div>
              <div class="">location: {this.state.profileData.location}</div>
              <div class="">
                Member Since: {this.state.profileData.created_at}
              </div>
            </div>
          </div>
        </div>

        <div class="count">
          <div class="">
            <Link to={`/${this.state.username}/repo`}>Repositories</Link> :{" "}
            {this.state.profileData.public_repos}
          </div>
          <div class="">
            <Link to={`/${this.state.username}/followers`}>Followers</Link> :{" "}
            {this.state.profileData.followers}
          </div>
          <div class="">
            <Link to={`/${this.state.username}/following`}>Following</Link> :{" "}
            {this.state.profileData.following}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loading) return <div>loading. . .</div>;

    return (
      <Container>
        <Link to="/">Go to Search</Link>
        <Search />
        <h2>{this.username}</h2>
        {this.renderProfile()}
        <Route path="/:username/repo" component={Repos} />
        <Route path="/:username/following" component={Following} />
        <Route path="/:username/followers" component={Followers} />
      </Container>
    );
  }
}

export default Profile;
