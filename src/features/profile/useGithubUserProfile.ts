import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/github';

const useGithubUserProfile = (username: string) => {
  return useQuery({
    queryKey: ['github-user', username],
    queryFn: () => fetchUser(username),
    enabled: Boolean(username)
  });
};

export default useGithubUserProfile;
