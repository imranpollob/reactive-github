import { GithubRepo } from '../api/github';

export interface RepoInsights {
  totalStars: number;
  totalForks: number;
  languages: { label: string; value: number }[];
  primaryLanguage: string | null;
  diversity: number;
  mostStarredRepo: GithubRepo | null;
  oldestRepo: GithubRepo | null;
  recentlyActiveRepo: GithubRepo | null;
}

export function buildRepoInsights(repos: GithubRepo[]): RepoInsights {
  let totalStars = 0;
  let totalForks = 0;
  const languageTally = new Map<string, number>();
  let mostStarredRepo: GithubRepo | null = null;
  let oldestRepo: GithubRepo | null = null;
  let recentlyActiveRepo: GithubRepo | null = null;

  repos.forEach(repo => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;

    if (repo.language) {
      languageTally.set(repo.language, (languageTally.get(repo.language) ?? 0) + 1);
    }

    if (!mostStarredRepo || repo.stargazers_count > mostStarredRepo.stargazers_count) {
      mostStarredRepo = repo;
    }

    if (!oldestRepo || new Date(repo.created_at) < new Date(oldestRepo.created_at)) {
      oldestRepo = repo;
    }

    if (!recentlyActiveRepo || new Date(repo.pushed_at) > new Date(recentlyActiveRepo.pushed_at)) {
      recentlyActiveRepo = repo;
    }
  });

  const primaryLanguage = (() => {
    let maxCount = 0;
    let primary: string | null = null;
    languageTally.forEach((count, language) => {
      if (count > maxCount) {
        maxCount = count;
        primary = language;
      }
    });
    return primary;
  })();

  const languages = Array.from(languageTally.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);

  return {
    totalStars,
    totalForks,
    languages,
    primaryLanguage,
    diversity: languageTally.size,
    mostStarredRepo,
    oldestRepo,
    recentlyActiveRepo
  };
}
