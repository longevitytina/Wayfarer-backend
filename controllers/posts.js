const db = require("../models");

// GET all posts by author e.g. /api/v1/posts?author=6542215664655
// GET all posts by city e.g. /api/v1/posts?city=san+francisco
// or all posts e.g. /api/v1/posts
const get = (req, res) => {
  if (req.query.author) {
    db.Post.find({ author: req.query.author })
      .sort("-updatedAt")
      .exec((err, posts) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: "Something went wrong, please try again.",
          });
        }
        res.json(posts);
      });
  } else if (req.query.city) {
    db.Post.find({ city: req.query.city })
      .sort("-updatedAt")
      .exec((err, posts) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: "Something went wrong, please try again.",
          });
        }
        res.json(posts);
      });
  } else {
    db.Post.find({})
      .sort("-updatedAt")
      .exec((err, posts) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: "Something went wrong, please try again.",
          });
        }
        res.json(posts);
      });
  }
};

const create = (req, res) => {
  db.Post.create(req.body, (err, newPost) => {
    if (err) {
      if (err.name == "ValidationError") {
        return res.status(422).json(err);
      }
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, please try again.",
      });
    }
    res.status(201).json(newPost);
  });
};

const show = (req, res) => {
  db.Post.findById(req.params.id)
    .populate("author")
    .populate("city")
    .exec((err, foundPost) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });
      }
      res.json(foundPost);
    });
};

const update = (req, res) => {
  db.Post.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }, // returns updated document
    (err, updatedPost) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again.",
        });
      }
      res.json(updatedPost);
    }
  );
};

const remove = (req, res) => {
  db.Post.deleteOne({ _id: req.params.id }, (err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        status: 400,
        error: "Something went wrong, please try again.",
      });
    }
    res.json(deletedPost);
  });
};

module.exports = {
  get,
  create,
  show,
  update,
  remove,
};
