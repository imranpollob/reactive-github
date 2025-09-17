import SearchForm from '../features/search/SearchForm';
import './home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero card">
        <div className="hero-copy">
          <h1>Discover GitHub Profiles</h1>
          <p>
            Get a quick snapshot of any GitHub user
          </p>
        </div>
        <SearchForm variant="hero" />
      </section>
    </div>
  );
};

export default HomePage;
