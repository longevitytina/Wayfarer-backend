const db = require("../models");

const show = (req, res) => {
  db.User
    .findById(req.params.id)
    .populate('city')
    .exec((err, foundPost) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'Something went wrong, please try again.'
        });
      }
      res.json(foundPost);
    })
}

const update = (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  db.User.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new: true}, // returns updated document
    (err, updatedProfile) => {
      console.log(updatedProfile)
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

const remove = (req, res) => {
  db.User.deleteOne(
    {_id: req.params.id},
    (err, deletedPost) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'Something went wrong, please try again.'
        });
      }
      res.json(deletedPost);
    }
  )
};

module.exports = {
  show,
  update,
  index,
  remove
};
