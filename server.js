const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const wineRoutes = require("./routes/wine-routes");
require("dotenv").config();

app.use(cors());

const PORT = process.env.PORT;

// this URL we use without hosting, local database from MongoDB Compass
// localhost :27017 - from mongodb compass / moviebox -our Database
// const URL = "mongodb://localhost:27017/wine_shop";

const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0.rmfxbzb.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

app.use(express.json());
app.use(wineRoutes);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`DB connection error: ${err}`);
  });

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
