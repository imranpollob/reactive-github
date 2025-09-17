import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '../../api/github';

const useGithubUserSearch = (term: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['search-users', term],
    queryFn: () => searchUsers(term),
    enabled,
    staleTime: 1000 * 30
  });
};

export default useGithubUserSearch;
