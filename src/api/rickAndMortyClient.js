// Rick and Morty API
// Handles fetching characters
import axios from 'axios';

export async function fetchAllCharacters() {
  const baseUrl = 'https://rickandmortyapi.com/api/character';
  let allCharacters = [];
  let nextUrl = baseUrl;

  try {
    while (nextUrl) {
      const response = await axios.get(nextUrl);
      if (!response.data || !response.data.results) {
        throw new Error('Invalid data structure from Rick and Morty API');
      }
      allCharacters = allCharacters.concat(response.data.results);
      nextUrl = response.data.info.next;
    }
  } catch (error) {
    console.error('Error fetching characters:', error.message);
    return [];
  }

  return allCharacters;
}