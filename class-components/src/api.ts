export const fetchItems = async (searchTerm: string) => {
    const url = searchTerm
        ? `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0&search=${searchTerm}`
        : 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.results;
};
