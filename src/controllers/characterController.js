// Controller for character logic
import { fetchAllCharacters } from '../api/rickAndMortyClient.js';
import { sendContactToHubspot } from '../api/hubspotClient.js';
import { filterAndTransformByEstimatedAge } from '../utils/filter.js';
import { HUBSPOT_PRIVATE_APP_TOKEN } from '../config/env.js';

export async function processAndSendCharacters(threshold = 5) {
  let allCharacters = [];
  let readyToSend = [];
  const results = [];
  try {
    if (!HUBSPOT_PRIVATE_APP_TOKEN) {
      throw new Error('Missing HUBSPOT_PRIVATE_APP_TOKEN in environment variables.');
    }
    allCharacters = await fetchAllCharacters();
    if (!Array.isArray(allCharacters) || allCharacters.length === 0) {
      throw new Error('No characters fetched from API.');
    }
    readyToSend = filterAndTransformByEstimatedAge(allCharacters, threshold);
    if (!Array.isArray(readyToSend) || readyToSend.length === 0) {
      throw new Error('No valid characters to send.');
    }
    const total = readyToSend.length;
    for (let i = 0; i < total; i++) {
      const contact = readyToSend[i];
      // progress
      console.log(`Sending contact ${i + 1} of ${total}`);
      const result = await sendContactToHubspot(contact, HUBSPOT_PRIVATE_APP_TOKEN);
      results.push({ name: contact.name, ...result });
    }
    return results;
  } catch (error) {
    console.error('Error in processAndSendCharacters:', error.message);
    return [{ success: false, error: error.message }];
  } finally {
    console.log(`Processed ${results.length} contacts.`);
  }
} 