const express = require("express");

const {
  users: { getAllUsers },
} = require("../../controllers");

const { wrapper, authenticate } = require("../../middlewares");

const router = express();

router.get("/", authenticate, wrapper(getAllUsers));

module.exports = router;
