const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/users

// get all users - for dev
router.get("/", ctrl.usersCtrl.index);

// get the user's profile using their ID
router.get("/:id", ctrl.usersCtrl.show);

// update user's profile using their ID
router.put("/:id", ctrl.usersCtrl.update);

module.exports = router;
