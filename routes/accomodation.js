const express = require("express");
const router = express.Router();
const Accomodation = require("../models/Accomodation");
// Get all Accomodations
router.get("/", async (req, res) => {
  const accomodations = await Accomodation.find({});
  res.send(accomodations);
});
// Get a single Accomodation
router.get("/:id", async (req, res) => {
  const accomodation = await Accomodation.findById(req.params.id);
  res.send(accomodation);
}); 



// // Add a new Accomodation
// router.post("/", async (req, res) => {
//   const { name, location, description, amenities } = req.body;
//   const accomodation = new Accomodation({
//     name,
//     location,
//     description,
//     amenities
//   })
//     await accomodation.save();
//     res.send(accomodation);
// })
module.exports = router;