const db = require("../models");

const index = (req, res) => {
  db.City.find({}, (err, allCities) => {
    if (err) {
      return res
        .status(400)
        .json({ status: 400, error: "Something went wrong, please try again" });
    }

    res.json(allCities);
  });
};

const show = (req, res) => {
  db.City.findById(req.params.id, (err, foundCity) => {
    if (err) {
      return res
        .status(400)
        .json({ status: 400, error: "Something went wrong, please try again" });
    }

    res.json(foundCity);
  });
};

const create = (req, res) => {
  db.City.create(req.body, (err, newCity) => {
    if (err) {
      return res
        .status(400)
        .json({ status: 400, error: "Something went wrong, please try again" });
    }

    res.status(201).json(newCity);
  });
};

module.exports = {
  index,
  show,
  create
};
