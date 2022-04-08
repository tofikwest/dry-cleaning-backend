const express = require("express");

const {
  drycleaner: { joiDryCleanSchema },
} = require("../../models");

const { wrapper, validation, authenticate } = require("../../middlewares");

const { drycleaners } = require("../../controllers");

const router = express();

router.post(
  "/",
  authenticate,
  validation(joiDryCleanSchema),
  wrapper(drycleaners)
);

module.exports = router;
