const express = require("express");

const router = express.Router();

const {
  getWines,
  getWine,
  deleteWine,
  addWine,
  updateWine,
} = require("../controllers/wine-controller");

const {
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller");

router.get("/", (req, res) => {
  console.log("Yoo");

  res.send({
    test: "Server is Working",
  });
});

router.get("/wines", getWines);
// db - hold the data from Database in successesful connection to Database
router.get("/wines/:id", getWine);
router.delete("/wines/:id", deleteWine);
router.post("/wines", addWine);
router.patch("/wines/:id", updateWine);

router.get("/users", getUsers);
router.get("/users/:id", getSingleUser);
router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
