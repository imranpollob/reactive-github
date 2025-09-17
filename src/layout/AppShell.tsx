import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="logo">
          <span aria-hidden="true" className="logo-mark">
            <span className="logo-mark__inner" />
          </span>
          GitLens
        </Link>
        <span className="app-tagline">GitHub explorer for quick insights</span>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <small>
          Built with ❤️ for GitHub explorers. Data courtesy of the GitHub REST API.
        </small>
      </footer>
    </div>
  );
};

export default AppShell;
