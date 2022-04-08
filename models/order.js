const Joi = require("joi");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { Schema, model } = require("mongoose");

const { SECRET_KEY } = process.env;

const orderSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Password is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "В обработке",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiOrderSchema = Joi.object({
  title: Joi.string().min(4).required(),
});

const Order = model("order", orderSchema);

module.exports = {
  Order,
  joiOrderSchema,
};
