const express = require("express");

const {
  services: { addService },
} = require("../../controllers");

const {
  service: { joiServiceSchema },
} = require("../../models");

const { wrapper, validation, authenticate } = require("../../middlewares");

const router = express();

router.post(
  "/",
  authenticate,
  validation(joiServiceSchema),
  wrapper(addService)
);

module.exports = router;
