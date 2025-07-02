// HubSpot API Client
// sending contacts to HubSpot
import axios from 'axios';

export async function sendContactToHubspot(contact, token) {
  const HUBSPOT_URL = `https://api.hubapi.com/crm/v3/objects/contacts`;
  let response = null;
  try {
    if (!contact || !contact.email) {
      throw new Error('Invalid contact data: missing email');
    }
    const payload = {
      properties: {
        firstname: contact.name,
        email: contact.email,
        status_: contact.status_,
        species: contact.species,
        estimatedage: contact.estimatedAge,
        category: contact.category
      }
    };
    response = await axios.post(HUBSPOT_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.data || !response.data.id) {
      throw new Error('Invalid response from HubSpot');
    }
    return { success: true, id: response.data.id };
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { success: false, error: 'Connection to HubSpot timed out.' };
    }
    return { success: false, error: error.response?.data || error.message };
  } finally {
    if (response) {
      console.log(response.status);
    }
  }
} 