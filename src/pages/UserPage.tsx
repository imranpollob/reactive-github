import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SearchForm from '../features/search/SearchForm';
import useGithubUserProfile from '../features/profile/useGithubUserProfile';
import useGithubUserRepos from '../features/repos/useGithubUserRepos';
import ProfileOverview from '../features/profile/ProfileOverview';
import LanguageSnapshot from '../features/languages/LanguageSnapshot';
import Highlights from '../features/highlights/Highlights';
import RepositoryExplorer from '../features/repos/RepositoryExplorer';
import { buildRepoInsights } from '../utils/githubStats';
import './user.css';

const UserPage = () => {
  const { username = '' } = useParams<{ username: string }>();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError
  } = useGithubUserProfile(username);
  const {
    data: repos = [],
    isLoading: isReposLoading,
    isError: isReposError,
    error: reposError
  } = useGithubUserRepos(username);

  const insights = useMemo(() => buildRepoInsights(repos), [repos]);
  const isInitialLoading = isUserLoading && !user;

  return (
    <div className="user-page">
      <section className="search-section">
        <SearchForm variant="compact" initialValue={username} />
      </section>

      {isInitialLoading && (
        <section className="card loading">
          <p>Loading GitHub profile…</p>
        </section>
      )}

      {isUserError && (
        <section className="card error">
          <h3>We couldn't load that user.</h3>
          <p>{(userError as Error)?.message ?? 'Unknown error'}</p>
        </section>
      )}

      {!isUserLoading && !isUserError && user && (
        <>
          <ProfileOverview user={user} insights={insights} />

          {isReposError && (
            <section className="card error">
              <h3>Repositories could not be loaded.</h3>
              <p>{(reposError as Error)?.message ?? 'Unknown error'}</p>
            </section>
          )}

          {!isReposError && isReposLoading && (
            <section className="card loading">
              <p>Loading repositories…</p>
            </section>
          )}

          {!isReposError && !isReposLoading && (
            <>
              <div className="insights-grid">
                <LanguageSnapshot insights={insights} />
                <Highlights insights={insights} />
              </div>

              {repos.length > 0 ? (
                <RepositoryExplorer repos={repos} />
              ) : (
                <section className="card">
                  <p>This user doesn't have public repositories yet.</p>
                </section>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserPage;
