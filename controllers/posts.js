const db = require("../models");

// const showPost = (req, res) => {
//   db.City.findById(req.params.cityId, (err, foundCity) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ status: 400, error: "Something went wrong, please try again" });
//     }

//     // Find Post By ID
//     const foundPost = foundCity.posts.id(req.params.postId);

//     // Verify Post Found
//     if (!foundPost) {
//       return res
//         .status(400)
//         .json({ status: 400, error: "Could not find post" });
//     }

//     res.json(foundPost);
//   });
// };

// const createPost = (req, res) => {
//   // Create Post
//   db.Post.create(req.body, (err, newPost) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ status: 400, error: "Something went wrong, please try again" });
//     }

//     // Find City To Associate The Post With
//     db.City.findById(req.params.cityId, (err, foundCity) => {
//       if (err) {
//         return res.status(400).json({
//           status: 400,
//           error: "Something went wrong, please try again",
//         });
//       }

//       // Add Post To City
//       foundCity.posts.push(newPost);

//       // Save Modified City
//       foundCity.save((err, savedCity) => {
//         if (err) {
//           return res.status(400).json({
//             status: 400,
//             error: "Something went wrong, please try again",
//           });
//         }

//         res.json(newPost);
//       });
//     });
//   });
// };

// const updatePost = (req, res) => {
//   // Find City By ID
//   db.City.findById(req.params.cityId, (err, foundCity) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ status: 400, error: "Something went wrong, please try again" });
//     }

//     // Find Post By ID
//     const postToUpdate = foundCity.posts.id(req.params.postId);

//     // Verify Post Found
//     if (!postToUpdate) {
//       return res
//         .status(400)
//         .json({ status: 400, error: "Could not find post" });
//     }

//     // Update Post In City Record
//     postToUpdate.title = req.body.title;
//     postToUpdate.content = req.body.content;

//     // Save Modified City
//     foundCity.save((err, savedCity) => {
//       if (err) {
//         return res.status(400).json({
//           status: 400,
//           error: "Something went wrong, please try again",
//         });
//       }

//       // Update Post in Post Collection
//       db.Post.findByIdAndUpdate(
//         req.params.postId,
//         req.body,
//         { new: true },
//         (err, updatedPost) => {
//           if (err) {
//             return res.status(400).json({
//               status: 400,
//               error: "Something went wrong, please try again",
//             });
//           }

//           res.json(updatedPost);
//         }
//       );
//     });
//   });
// };

// const deletePost = (req, res) => {
//   // Find City By ID
//   db.City.findById(req.params.cityId, (err, foundCity) => {
//     if (err) {
//       return res
//         .status(400)
//         .json({ status: 400, error: "Something went wrong, please try again" });
//     }

//     // Find Post By ID
//     const postToDelete = foundCity.posts.id(req.params.postId);

//     if (!postToDelete) {
//       return res
//         .status(400)
//         .json({ status: 400, error: "Could not find post" });
//     }

//     // Delete Post From City Record
//     postToDelete.remove();

//     // Save Modified City
//     foundCity.save((err, savedCity) => {
//       if (err) {
//         return res.status(400).json({
//           status: 400,
//           error: "Something went wrong, please try again",
//         });
//       }

//       // Delete Post From Post Collection
//       db.Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
//         if (err) {
//           return res.status(400).json({
//             status: 400,
//             error: "Something went wrong, please try again",
//           });
//         }

//         res.json(deletedPost);
//       });
//     });
//   });
// };

// GET all posts by author e.g. /api/v1/posts?author=6542215664655
// GET all posts by city e.g. /api/v1/posts?city=san+francisco
// or all posts e.g. /api/v1/posts
const get = (req, res) => {
  if (req.query.author) {
    db.Post.find({author: req.query.author}, (err, posts) => {
      if(err) {
        return res.status(400).json({
          status: 400,
          error: 'Something went wrong, please try again.'
        });
      }
      res.json(posts);
    });
  } else if (req.query.city) {
    db.Post.find({city: req.query.city}, (err, posts) => {
      if(err) {
        return res.status(400).json({
          status: 400,
          error: 'Something went wrong, please try again.'
        });
      }
      res.json(posts);
    });
  } else {
    db.Post.find({}, (err, posts) => {
      if(err) {
        return res.status(400).json({
          status: 400,
          error: 'Something went wrong, please try again.'
        });
      }
      res.json(posts);
    });
  }
}

const create = (req, res) => {
  db.Post.create(req.body, (err, newPost) => {
    if(err) {
      return res.status(400).json({
        status: 400,
        error: 'Something went wrong, please try again.'
      });
    }
    res.status(201).json(newPost);
  });
};

const show = (req, res) => {
  db.Post
    .findById(req.params.id)
    .populate('author')
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
  db.Post.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new: true}, // returns updated document
    (err, updatedPost) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: 'Something went wrong, please try again.'
        });
      }
      res.json(updatedPost);
    }
  )
}

const remove = (req, res) => {
  db.Post.deleteOne(
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
  // showPost,
  // createPost,
  // updatePost,
  // deletePost,
  get,
  create,
  show,
  update,
  remove,
};
