import { GithubUser } from '../../api/github';
import { RepoInsights } from '../../utils/githubStats';
import { formatDateString } from '../../utils/format';
import './profile.css';

interface ProfileOverviewProps {
  user: GithubUser;
  insights: Pick<RepoInsights, 'totalStars' | 'totalForks'>;
}

const ProfileOverview = ({ user, insights }: ProfileOverviewProps) => {
  return (
    <section className="profile card">
      <div className="profile__header">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={user.avatar_url} alt={user.login} />
        </div>
        <div className="profile__meta">
          <h2>{user.name ?? user.login}</h2>
          <p className="profile__username">@{user.login}</p>
          {user.bio && <p className="profile__bio">{user.bio}</p>}
          <div className="profile__links">
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View on GitHub →
            </a>
            {user.blog && (
              <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                 target="_blank"
                 rel="noreferrer">
                Website
              </a>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noreferrer"
              >
                @{user.twitter_username}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="profile__details">
        <div className="detail">
          <span className="detail__label">Company</span>
          <span className="detail__value">{user.company ?? '—'}</span>
        </div>
        <div className="detail">
          <span className="detail__label">Location</span>
          <span className="detail__value">{user.location ?? '—'}</span>
        </div>
        <div className="detail">
          <span className="detail__label">Member Since</span>
          <span className="detail__value">{formatDateString(user.created_at)}</span>
        </div>
      </div>

      <div className="profile__stats">
        <div>
          <div className="stat-value">{user.followers}</div>
          <div className="stat-label">Followers</div>
        </div>
        <div>
          <div className="stat-value">{user.following}</div>
          <div className="stat-label">Following</div>
        </div>
        <div>
          <div className="stat-value">{user.public_repos}</div>
          <div className="stat-label">Public Repos</div>
        </div>
        <div>
          <div className="stat-value">{insights.totalStars}</div>
          <div className="stat-label">Total Stars</div>
        </div>
        <div>
          <div className="stat-value">{insights.totalForks}</div>
          <div className="stat-label">Total Forks</div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
