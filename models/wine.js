const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wineSchema = new Schema({
  wine: {
    type: String,
    required: true,
  },
  winary: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      name: String,
      text: String,
      date_time: String,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    required: false,
  },
});

const Wine = mongoose.model("Wine", wineSchema);
// const Wine is a model which represents a class, trefore it is Capital
// ("Wine")- name of the model
// wineSchema - name of the Schema (must be a wine coz mongoose will search-
// -in database collection with plural name from wine) - collection name in mongoDB -is wines

// document manipulation from database is happening because of model
module.exports = Wine;
