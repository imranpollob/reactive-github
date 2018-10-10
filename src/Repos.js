import React, { Component } from "react";
import "./Repos.css";

class Repos extends Component {
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

  fetchReposioryData(page = 1) {
    const api = `https://api.github.com/users/${
      this.username
    }/repos?sort=pushed&per_page=10&page=${page}`;
    fetch(api)
      .then(response => response.json())
      .then(data => {
        console.log(data.length);
        if (data.length !== 0) {
          this.setState({ repositoryData: data });
        }
      });
  }

  renderRepositorySummary() {
    const totalPages = Math.ceil(this.state.profileData.public_repos / 10);
    let paginationArray = [];
    for (var i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }

    return (
      <div>
        {paginationArray.map(number => (
          <button onClick={() => this.fetchReposioryData(number)}>
            {number}
          </button>
        ))}

        {this.state.repositoryData.map(repo => (
          <div key={repo.id} class="repo">
            <div class="repo-header">
              <div class="repo-title">
                {repo.name} {repo.fork && <div className="forked">Forked</div>}
              </div>
              <div class="repo-url">
                <a href={repo.html_url} target="_blank">
                  Link
                </a>
              </div>
            </div>
            <div class="repo-body">{repo.description}</div>
            <div class="repo-status">
              <div class="">Language : {repo.language}</div>
              <div class="">Stars : {repo.stargazers_count}</div>
              <div class="">Forks : {repo.forks_count}</div>
              <div class="">
                Last Update : {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    if (this.state.loading) return <div>loading. . .</div>;

    return <div>{this.renderRepositorySummary()}</div>;
  }
}

export default Repos;
