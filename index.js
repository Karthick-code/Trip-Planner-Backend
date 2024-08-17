const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database-connect/connectDB");
const app = express();
const PORT = process.env.PORT || 3000;

//import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const travelPlanRoutes = require("./routes/travelplan");
const destinationRoutes = require("./routes/destinations");
const todoroutes = require("./routes/todo");
const bookingRoutes = require("./routes/booking");
const accomodationRoutes = require("./routes/accomodation");
const accomodationBookingRoutes = require("./routes/accomodationBooking");
const busRoutes = require("./routes/bus");

app.use(cors());
app.use(express.json());

// Defining the route
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/travelplan", travelPlanRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/todo", todoroutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/accomodation", accomodationRoutes);
app.use("/api/book-accomodations", accomodationBookingRoutes);
app.use("/api/bus", busRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});