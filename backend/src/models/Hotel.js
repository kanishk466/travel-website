import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
  amenities: [String],
  createdAt: { type: Date, default: Date.now },
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
