const { model } = require("mongoose");
const User = require("../models/user");

const handleError = (res, error) => {
  // to make our code DRY, res.status(500).json({ error: "Something went wrong ..." })
  // is the same in every route
  res.status(500).json({ error });
};

const getUsers = (req, res) => {
  User.find()
    .sort({ name: 1 })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const getSingleUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const addUser = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // we can replace all catch methods with error 500 on this function below
      // to make code DRY
      handleError(res, err);
      //   as a response will show an err
    });
};

module.exports = { getUsers, getSingleUser, addUser, updateUser, deleteUser };
