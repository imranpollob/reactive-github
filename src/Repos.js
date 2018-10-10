import React, { Component } from "react";

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

    return <div>{this.renderRepositorySummary()}</div>;
  }
}

export default Repos;
