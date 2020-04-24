const express = require("express");
const router = express.Router();
const db = require("../models");
const ctrl = require("../controllers");

// CURRENT PATH = 'api/v1/posts'

// // / Post CitiesPosts Create
// router.post("/users/:userId/posts", ctrl.postsCtrl.createPost);

// // PUT CitiesPosts Update
// router.put("/users/:userId/posts/:postId", ctrl.postsCtrl.updatePost);

// // DELETE userPosts Destroy
// router.delete("/users/:userId/posts/:postId", ctrl.postsCtrl.deletePost);



// GET all posts by author e.g. /api/v1/posts?author=6542215664655
// GET all posts by city e.g. /api/v1/posts?city=san+francisco
// or all posts e.g. /api/v1/posts
router.get("/", ctrl.postsCtrl.get);

// POST new post
router.post("/", ctrl.postsCtrl.create);

// GET post by id
router.get("/:id", ctrl.postsCtrl.show);

// UPDATE post by id
router.put("/:id", ctrl.postsCtrl.update);

// DELETE post by id
router.delete("/:id", ctrl.postsCtrl.remove);

module.exports = router;
