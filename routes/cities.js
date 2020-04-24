const express = require("express");
const router = express.Router();
// const db = require("../models");
const ctrl = require("../controllers");

// CURRENT PATH = 'api/v1/cities'

// GET all Cities
router.get("/", ctrl.citiesCtrl.index);

// POST new city - for dev
router.post("/", ctrl.citiesCtrl.create);

// GET city by id
router.get("/:id", ctrl.citiesCtrl.show);

module.exports = router;
