
const express = require('express');
const router = express.Router();
const AccomodationBooking = require('../models/AccomodationBooking'); // Adjust path as needed

// Route to handle booking
router.post('/', async (req, res) => {
  try {
    const {  user, checkInDate, checkOutDate } = req.body;

    // Check for overlapping bookings
    const existingBookings = await AccomodationBooking.find({
      $or: [
        { checkInDate: { $lt: new Date(checkOutDate) }, checkOutDate: { $gt: new Date(checkInDate) } },
      ],
    });

    if (existingBookings.length > 0) {
      return res.status(400).send({ message: 'Accomodation already booked for these dates' });
    }

    // Create new booking
    const newBooking = new AccomodationBooking({  user, checkInDate, checkOutDate });
    await newBooking.save();

    res.status(201).send({ message: 'Booking successful' });
  } catch (error) {
    console.error('Error booking accomodation:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
