const { model } = require("mongoose");
const User = require("../models/user");

const handleError = (res, error) => {
  console.error(error);

  res.status(500).json({
    error: "Something went wrong ...",
  });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.status(200).json(users);
  } catch (err) {
    handleError(res, err);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    handleError(res, err);
  }
};

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.status(201).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    handleError(res, err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { getUsers, getSingleUser, addUser, updateUser, deleteUser };
