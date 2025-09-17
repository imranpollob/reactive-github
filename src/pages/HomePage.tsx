import SearchForm from '../features/search/SearchForm';
import './home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero card">
        <div className="hero-copy">
          <h1>Discover GitHub profiles in seconds.</h1>
          <p>
            Reactive GitHub gives you a fast overview of any public profile with stats,
            language usage, and repository highlights in one dashboard.
          </p>
        </div>
        <SearchForm variant="hero" />
        <ul className="hero-highlights">
          <li>• Summaries that surface followers, stars, forks, and repo counts</li>
          <li>• Repository explorer with sorting, language filters, and activity signals</li>
          <li>• Language snapshot charts and quick facts for instant context</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
