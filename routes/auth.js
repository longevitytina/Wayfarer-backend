const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");

// PATH = /api/v1/auth
router.post("/register", ctrl.authCtrl.register);
router.post("/login", ctrl.authCtrl.login);
router.get("/verify", ctrl.authCtrl.verify);
router.delete("/logout", ctrl.authCtrl.logout);

module.exports = router;
