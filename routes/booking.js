const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const e = require('express');
// Create a new booking
router.post('/:id', auth, async (req, res) => {
    try {
        const { transportation,from,to,date } = req.body;
        const booking = new Booking({
            user: req.params.id,
            transportation,
            from,
            to,
            date,
           
        })
        await booking.save();
        res.status(201).send(booking);
    }
    catch (error) {
        res.status(500).send({ message: "Error creating booking", error: error.message })
    }
})

// Get all bookings by individual user
router.get('/:id', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.id });
        return res.status(200).send(bookings);
    }
    catch (error) {
        res.status(500).send({ message: "Error fetching bookings", error: error.message })
    }
})


module.exports = router;