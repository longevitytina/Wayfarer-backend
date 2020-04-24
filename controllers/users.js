const db = require("../models");

const show = (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: err,
      });

    res.status(200).json({
      status: 200,
      data: foundUser,
    });
  });
};

const update = (req, res) => {
  db.User.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new: true}, // returns updated document
    (err, updatedProfile) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'Something went wrong, please try again.'
        });
      }
      res.json(updatedProfile);
    }
  )
}

const index = (req, res) => {
  db.User.find({}, (err, users) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: err,
      });

    res.json(users);
  })
}

module.exports = {
  show,
  update,
  index
};
