import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Create a new hotel
router.post('/', async (req, res) => {
  const { name, location, amenities } = req.body;

  try {
    const hotel = new Hotel({ name, location, amenities });
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export default router;
