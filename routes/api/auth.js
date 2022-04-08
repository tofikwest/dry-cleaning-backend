const express = require("express");

const {
  user: { joiUserSchema },
} = require("../../models");

const { wrapper, validation } = require("../../middlewares");

const {
  auth: { registration, login, resetPassword },
} = require("../../controllers");

const router = express();

router.post("/signup", validation(joiUserSchema), wrapper(registration));

router.post("/login", validation(joiUserSchema), wrapper(login));

router.post("/resetPass", wrapper(resetPassword));

module.exports = router;
