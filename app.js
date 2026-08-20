const express = require("express");
const cors = require("cors");
const wineRoutes = require("./routes/wine-routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(wineRoutes);

module.exports = app;
