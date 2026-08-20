const Wine = require("../models/wine");

const handleError = (res, error) => {
  console.error(error);

  res.status(500).json({
    error: "Something went wrong ...",
  });

  // res.status(500).json({ error });
};

const getWines = async (req, res) => {
  try {
    // Wine is a model
    const wines = await Wine.find().sort({ wine: 1 });
    res.status(200).json(wines);
  } catch (err) {
    handleError(res, err);
    // res.status(500).json({ error: "Something went wrong ..." });
  }
};

const getWine = async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    res.status(200).json(wine);
  } catch (err) {
    handleError(res, err);
  }
};

const addWine = async (req, res) => {
  try {
    const wine = new Wine(req.body);
    const result = await wine.save();

    res.status(201).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

const updateWine = async (req, res) => {
  try {
    const result = await Wine.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

const deleteWine = async (req, res) => {
  try {
    const wine = await Wine.findByIdAndDelete(req.params.id);
    res.status(200).json(wine);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { getWines, getWine, addWine, updateWine, deleteWine };
