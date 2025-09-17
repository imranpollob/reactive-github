export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  size: number;
  topics?: string[];
}

export interface GithubSearchUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

const API_BASE = 'https://api.github.com';
const DEFAULT_HEADERS: Record<string, string> = {
  Accept: 'application/vnd.github+json'
};

class GithubError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'GithubError';
    this.status = status;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = response.statusText;
    try {
      const payload = await response.json();
      if (payload && typeof payload.message === 'string') {
        message = payload.message;
      }
    } catch (error) {
      // ignore JSON parse issues for error responses
    }

    throw new GithubError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export async function fetchUser(username: string): Promise<GithubUser> {
  const response = await fetch(`${API_BASE}/users/${encodeURIComponent(username)}`, {
    headers: DEFAULT_HEADERS
  });
  return handleResponse<GithubUser>(response);
}

function hasNextPage(response: Response): boolean {
  const linkHeader = response.headers.get('link');
  if (!linkHeader) return false;
  return linkHeader.split(',').some(part => part.includes('rel="next"'));
}

export async function fetchUserRepos(username: string): Promise<GithubRepo[]> {
  const perPage = 100;
  const results: GithubRepo[] = [];
  let page = 1;
  let hasNext = true;
  const maxPages = 5; // safeguard against extreme pagination / rate limits

  while (hasNext && page <= maxPages) {
    const response = await fetch(
      `${API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&page=${page}&sort=updated`,
      { headers: DEFAULT_HEADERS }
    );
    const chunk = await handleResponse<GithubRepo[]>(response);
    results.push(...chunk);
    hasNext = hasNextPage(response) && chunk.length === perPage;
    page += 1;
  }

  return results;
}

export async function searchUsers(query: string): Promise<GithubSearchUser[]> {
  if (!query.trim()) return [];

  const response = await fetch(
    `${API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=5`,
    { headers: DEFAULT_HEADERS }
  );
  const payload = await handleResponse<{ items: GithubSearchUser[] }>(response);
  return payload.items;
}

export { GithubError };
