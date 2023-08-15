const Wine = require("../models/wine");

const handleError = (res, error) => {
  // to make our code DRY, res.status(500).json({ error: "Something went wrong ..." })
  // is the same in every route
  res.status(500).json({ error });
};

const getWines = (req, res) => {
  console.log("Hello");
  // Wine is a model -imported from wine, this is our data from database
  Wine.find()
    .sort({ wine: 1 })
    .then((wines) => {
      res.status(200).json(wines);
      //   db.collection("wines").find() method doesn't return all wines, it returns -cursor object(it is a data set from Database)
      //   cursor has some methods( hasNext,next,forEach)
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong ..." });
    });
};

const getWine = (req, res) => {
  Wine.findById(req.params.id)
    .then((wine) => {
      res.status(200).json(wine);
      //   db.collection("wines").find() method doesn't return all wines, it returns -cursor object(it is a data set from Database)
      //   cursor has some methods( hasNext,next,forEach)
    })
    .catch(() => {
      res.status(500).json({ error: "Something went wrong ..." });
      //   this errorhandling doesn't show correct and exact error to the user, need to use err -handleError(res, err);
    });
};

const deleteWine = (req, res) => {
  Wine.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
      //   db.collection("movies").find() method doesn't return all movies, it returns -cursor object(it is a data set from Database)
      //   cursor has some methods( hasNext,next,forEach)
    })
    .catch((err) => {
      // we can replace all catch methods with error 500 on this function below
      // to make code DRY
      handleError(res, err);
      //   as a response will show an err
    });
};

const addWine = (req, res) => {
  const wine = new Wine(req.body);

  wine
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      handleError(res, err);
    });
};

const updateWine = (req, res) => {
  // console.log(req.body);
  Wine.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = { getWines, getWine, deleteWine, addWine, updateWine };
