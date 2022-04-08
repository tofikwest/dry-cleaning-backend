const express = require("express");

const {
  orders: { createOrder, getOrders, updateOrder },
} = require("../../controllers");

const {
  order: { joiOrderSchema },
} = require("../../models");

const { wrapper, validation, authenticate } = require("../../middlewares");

const router = express();

router.get("/", authenticate, wrapper(getOrders));

router.post(
  "/",
  validation(joiOrderSchema),
  authenticate,
  wrapper(createOrder)
);

router.patch("/:orderId", authenticate, wrapper(updateOrder));

module.exports = router;
