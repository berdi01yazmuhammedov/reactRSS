export const fetchItems = async (searchTerm: string) => {
  const url = searchTerm
    ? `https://api.github.com/users/${encodeURIComponent(searchTerm)}/repos?per_page=5&page=1`
    : 'https://api.github.com/users';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};
