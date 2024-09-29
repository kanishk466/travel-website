import express from 'express';
import Room from '../models/Room.js';

const router = express.Router();

// Create a new room for a hotel
router.post('/', async (req, res) => {
  const { hotelId, roomNumber, type, pricePerNight, maxOccupancy } = req.body;
  console.log(hotelId , roomNumber , type , pricePerNight , maxOccupancy);
  

  try {
    const room = new Room({ hotelId, roomNumber, type, pricePerNight, maxOccupancy });
    await room.save();
    res.status(201).json(room);

  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get all rooms for a hotel
router.get('/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  try {
    const rooms = await Room.find({ hotelId });
    res.json(rooms);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export default router;
