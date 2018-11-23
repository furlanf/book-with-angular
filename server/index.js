const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const FakeDb = require("./fake-db");
const path = require("path");

const rentalRoutes = require("./routes/rentals"),
  bookingRoutes = require("./routes/bookings"),
  userRoutes = require("./routes/users");

mongoose.connect(config.DB_URI).then(() => {
  if (process.env.NODE_ENV === "development") {
    const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  }
});

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookings", bookingRoutes);

if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "dist");
  app.use(express.static(appPath));

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log("Running on port: " + PORT);
});
