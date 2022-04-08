const Joi = require("joi");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { Schema, model } = require("mongoose");

const { SECRET_KEY } = process.env;

const serviceSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Password is required"],
    },
    price: {
      type: Number,
      required: [true, "Password is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiServiceSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
});

const Service = model("service", serviceSchema);

module.exports = {
  Service,
  joiServiceSchema,
};
