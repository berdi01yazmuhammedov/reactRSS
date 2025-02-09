export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
}
export type Item = Repository | GitHubUser;
export const fetchItems = async (searchTerm: string): Promise<Item[]> => {
  const url = searchTerm
    ? `https://api.github.com/users/${encodeURIComponent(
      searchTerm
    )}/repos?per_page=5&page=1`
    : 'https://api.github.com/users';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data: Item[] = await response.json();
  return data;
};
