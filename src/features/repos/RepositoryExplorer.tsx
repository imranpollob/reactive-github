import { useMemo, useState } from 'react';
import { GithubRepo } from '../../api/github';
import { formatDistance, formatNumber } from '../../utils/format';
import './repos.css';

type SortKey = 'stars' | 'updated' | 'created';

interface RepositoryExplorerProps {
  repos: GithubRepo[];
}

const sortComparators: Record<SortKey, (a: GithubRepo, b: GithubRepo) => number> = {
  stars: (a, b) => b.stargazers_count - a.stargazers_count,
  updated: (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  created: (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
};

const RepositoryExplorer = ({ repos }: RepositoryExplorerProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('stars');
  const [languageFilter, setLanguageFilter] = useState<string>('all');

  const languages = useMemo(() => {
    const set = new Set(repos.map(repo => repo.language).filter(Boolean) as string[]);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const visibleRepos = useMemo(() => {
    const filtered = languageFilter === 'all'
      ? repos
      : repos.filter(repo => repo.language === languageFilter);

    return [...filtered].sort(sortComparators[sortKey]);
  }, [repos, sortKey, languageFilter]);

  return (
    <section className="repos card">
      <div className="repos__header">
        <div>
          <h3>Repository Explorer</h3>
          <p className="hint-text">Showing {visibleRepos.length} of {repos.length} repositories</p>
        </div>
        <div className="repos__controls">
          <label>
            Sort by
            <select value={sortKey} onChange={event => setSortKey(event.target.value as SortKey)}>
              <option value="stars">Stars</option>
              <option value="updated">Last updated</option>
              <option value="created">Creation date</option>
            </select>
          </label>
          <label>
            Language
            <select value={languageFilter} onChange={event => setLanguageFilter(event.target.value)}>
              <option value="all">All languages</option>
              {languages.map(language => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="repos__list">
        {visibleRepos.map(repo => (
          <article key={repo.id} className="repo-card">
            <header>
              <div className="title">
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
                {repo.fork && <span className="badge">Fork</span>}
              </div>
              <p>{repo.description ?? 'No description provided.'}</p>
            </header>

            <footer>
              <ul>
                <li>
                  ⭐ {formatNumber(repo.stargazers_count)}
                </li>
                <li>
                  🍴 {formatNumber(repo.forks_count)}
                </li>
                {repo.language && <li>💻 {repo.language}</li>}
                <li>🕒 Updated {formatDistance(repo.pushed_at)}</li>
              </ul>
            </footer>
          </article>
        ))}
        {visibleRepos.length === 0 && (
          <div className="empty">
            <p>No repositories match this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RepositoryExplorer;
