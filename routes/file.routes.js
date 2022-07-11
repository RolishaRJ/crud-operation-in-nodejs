const express = require('express');
const controller = require('../controllers/file.controller');
const router = express.Router();

router.get("/readfile", controller.readFile);


module.exports = { fileRouter: router };