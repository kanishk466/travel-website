import express from 'express';
import Reservation from '../models/Reservation.js';
import Room from '../models/Room.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Make a reservation
router.post('/', auth, async (req, res) => {
  const { hotelId, roomId, checkIn, checkOut, totalPrice } = req.body;
  const userId = req.userId;

  try {
    const room = await Room.findById(roomId);
    if (!room.isAvailable) return res.status(400).json({ msg: 'Room not available' });

    const reservation = new Reservation({ userId, hotelId, roomId, checkIn, checkOut, totalPrice });
    await reservation.save();

    room.isAvailable = false;
    room.bookings.push(reservation._id);
    await room.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export default router;
