import React, { Component } from "react";

class Repos extends Component {
  username = this.props.match.params.username;
  state = {
    repositoryData: [],
    loading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    await this.fetchReposioryData();
    this.setState({ loading: false });
  };

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
          {this.renderRepositorySummary()}
      </div>
    );
  }
}

export default Repos;
