import { useQuery } from '@tanstack/react-query';
import { fetchUserRepos } from '../../api/github';

const useGithubUserRepos = (username: string) => {
  return useQuery({
    queryKey: ['github-user-repos', username],
    queryFn: () => fetchUserRepos(username),
    enabled: Boolean(username),
    staleTime: 1000 * 60
  });
};

export default useGithubUserRepos;
