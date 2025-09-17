import { GithubRepo } from '../../api/github';
import { RepoInsights } from '../../utils/githubStats';
import { formatDateString, formatDistance, formatNumber } from '../../utils/format';
import './highlights.css';

interface HighlightsProps {
  insights: Pick<RepoInsights, 'mostStarredRepo' | 'oldestRepo' | 'recentlyActiveRepo'>;
}

type HighlightItem = {
  key: string;
  title: string;
  repo: GithubRepo | null;
  meta: (repo: GithubRepo) => string;
  footer: (repo: GithubRepo) => string;
};

const Highlights = ({ insights }: HighlightsProps) => {
  const items: HighlightItem[] = [
    {
      key: 'most-starred',
      title: 'Most starred repo',
      repo: insights.mostStarredRepo,
      meta: (repo: GithubRepo) => `⭐ ${formatNumber(repo.stargazers_count)} stars`,
      footer: (repo: GithubRepo) => `Updated ${formatDistance(repo.pushed_at)}`
    },
    {
      key: 'oldest',
      title: 'Oldest repo',
      repo: insights.oldestRepo,
      meta: (repo: GithubRepo) => `Created ${formatDateString(repo.created_at)}`,
      footer: (repo: GithubRepo) => `Last push ${formatDistance(repo.pushed_at)}`
    },
    {
      key: 'recent',
      title: 'Recently active repo',
      repo: insights.recentlyActiveRepo,
      meta: (repo: GithubRepo) => `Pushed ${formatDistance(repo.pushed_at)}`,
      footer: (repo: GithubRepo) => `⭐ ${formatNumber(repo.stargazers_count)} · 🍴 ${formatNumber(repo.forks_count)}`
    }
  ];

  return (
    <section className="highlights card">
      <h3>Highlights</h3>
      <div className="highlights__grid">
        {items.map(item => (
          <article key={item.key} className="highlight-card">
            <header>
              <span className="badge">{item.title}</span>
            </header>
            {item.repo ? (
              <>
                <h4>
                  <a href={item.repo.html_url} target="_blank" rel="noreferrer">
                    {item.repo.name}
                  </a>
                </h4>
                <p>{item.repo.description ?? 'No description provided.'}</p>
                <div className="meta">{item.meta(item.repo)}</div>
                <div className="footer">{item.footer(item.repo)}</div>
              </>
            ) : (
              <p className="hint-text">No data available.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
