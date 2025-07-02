// Express routes for character endpoints
import express from 'express';
import { processAndSendCharacters } from '../controllers/characterController.js';

const router = express.Router();

// POST to endpoint /api/send-to-hubspot
router.post('/send-to-hubspot', async (req, res) => {
  try {
    const results = await processAndSendCharacters(5);
    res.status(200).json({ message: 'Contacts sent to HubSpot', results });
  } catch (error) {
    console.error('Error in /send-to-hubspot route:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router; 