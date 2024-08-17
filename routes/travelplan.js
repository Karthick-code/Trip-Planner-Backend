const express = require("express");
const router = express.Router();
const TravelPlan = require("../models/Travelplan");
const auth = require("../middleware/auth");

// Get all travel plans by individual user
router.get("/:id", auth, async (req, res) => {
    try {
        const travelplans = await TravelPlan.find({ user: req.params.id });
        return res.status(200).send(travelplans);
    } catch (error) {
        return res.status(500).send({ message: "Error fetching travel plans", error: error.message });
    }
});

// Create travel plan
router.post("/:id", auth, async (req, res) => {
    try {
        const { title, description, startdate, enddate, destination, budget, activities, accomodation, transportation, notes } = req.body;
        const travelplan = new TravelPlan({
            user: req.params.id,
            title,
            description,
            startdate,
            enddate,
            destination,
            budget,
            activities,
            accomodation,
            transportation,
            notes
        });
        await travelplan.save();
        return res.status(201).send(travelplan);
    } catch (error) {
        return res.status(500).send({ message: "Error creating travel plan", error: error.message });
    }
});

// Update travel plan
router.put("/:id", auth, async (req, res) => {
    try {
        const { title, description, startdate, enddate, destination, budget, activities, accomodation, transportation, notes } = req.body;
        const travelplan = await TravelPlan.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                startdate,
                enddate,
                destination,
                budget,
                activities,
                accomodation,
                transportation,
                notes
            },
            { new: true } // Returns the updated document
        );

        if (!travelplan) {
            return res.status(404).send({ message: "Travel plan not found" });
        }

        return res.status(200).send(travelplan);
    } catch (error) {
        return res.status(500).send({ message: "Error updating travel plan", error: error.message });
    }
});

// Delete travel plan
router.delete("/:id", auth, async (req, res) => {
    try {
        const travelplan = await TravelPlan.findByIdAndDelete(req.params.id);

        if (!travelplan) {
            return res.status(404).send({ message: "Travel plan not found" });
        }

        return res.status(200).send({ message: "Travel plan deleted successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Error deleting travel plan", error: error.message });
    }
});

module.exports = router;
