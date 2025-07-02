// Utility functions for filtering and transforming character data

// Calling filter to map
export function filterAndTransformByEstimatedAge(characters, threshold = 5) {
  if (!Array.isArray(characters)) {
    return [];
  }
  return characters
    .filter(c => c && typeof c.episode === 'object' && Array.isArray(c.episode))
    .map(character => ({
      name: character.name,
      status_: character.status,
      estimatedAge: Array.isArray(character.episode) ? character.episode.length : 0,
      species: character.species,
      category: (Array.isArray(character.episode) && character.episode.length >= threshold) ? 'older' : 'younger',
      email: `${character.id}@rickmorty.com`
    }));
} 