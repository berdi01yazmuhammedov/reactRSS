export const fetchItems = async (searchTerm: string) => {
    const url = searchTerm
        ? `https://swapi.dev/api/people/?search=${encodeURIComponent(searchTerm)}`
        : 'https://swapi.dev/api/people/';

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.results;
};
