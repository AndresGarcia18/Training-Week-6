# Rick & Morty - HubSpot Integration

This project integrates the Rick and Morty API with the HubSpot Contacts API, allowing you to filter characters and send them as contacts to HubSpot.

## Project Structure

```
src/
  api/
    rickAndMortyClient.js      # Rick and Morty API client (async)
    hubspotClient.js           # HubSpot API client (async)
  controllers/
    characterController.js     # Business logic and filtering (async)
  routes/
    characterRoutes.js         # Backend routes
  utils/
    filterUtils.js             # Filtering functions
  config/
    env.js                     # Environment variables
  server.js                    # Entry point
```

## Installation

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root with your HubSpot API Key:
   ```
   HUBSPOT_API_KEY=YOUR_API_KEY_HERE
   PORT=3000
   ```
4. Start the server:
   ```
   npm start
   ```

## Usage

- Main endpoint:
  - `POST /api/send-to-hubspot` to fetch, filter, and send characters to HubSpot.

## Asynchronism in This Project

This project makes extensive use of JavaScript's asynchronism to handle HTTP requests and data processing efficiently without blocking the main thread. All API calls and data flows are handled using `async/await` syntax for clarity and non-blocking execution.

**Where asynchronism is used:**
- `src/api/rickAndMortyClient.js`: Fetches characters asynchronously from the Rick and Morty API.
- `src/api/hubspotClient.js`: Sends contacts asynchronously to HubSpot.
- `src/controllers/characterController.js`: Orchestrates async data fetching, filtering, and sending.

**Example:**
```js
// Example from rickAndMortyClient.js
export async function fetchAllCharacters() {
  let allCharacters = [];
  let nextUrl = 'https://rickandmortyapi.com/api/character';
  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl);
      allCharacters = allCharacters.concat(response.data.results);
      nextUrl = response.data.info.next;
    } catch (error) {
      console.error('Error fetching characters:', error.message);
      break;
    }
  }
  return allCharacters;
}
```

All asynchronous flows use `async/await` for readability and robust error handling.
