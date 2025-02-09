export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

export type Item = Repository | GitHubUser;
const getAuthHeaders = () => ({
  Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
});

export const fetchItems = async (
  searchTerm: string,
  page: number = 1
): Promise<Item[]> => {
  const url = searchTerm
    ? `https://api.github.com/users/${encodeURIComponent(
      searchTerm
    )}/repos?per_page=5&page=${page}`
    : `https://api.github.com/users?per_page=5&page=${page}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data: Item[] = await response.json();
  return data;
};

export const fetchRepoDetails = async (repoId: number): Promise<Repository> => {
  const url = `https://api.github.com/repositories/${repoId}`;
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data: Repository = await response.json();
  return data;
};

export const fetchUserDetails = async (
  login: string
): Promise<GitHubUser> => {
  const url = `https://api.github.com/users/${encodeURIComponent(login)}`;
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data: GitHubUser = await response.json();
  return data;
};