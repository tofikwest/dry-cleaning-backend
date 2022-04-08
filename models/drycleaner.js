const Joi = require("joi");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { Schema, model } = require("mongoose");

const { SECRET_KEY } = process.env;

const drycleanerSchema = Schema(
  {
    drycleaner: {
      type: String,
      required: [true, "Password is required"],
    },
    description: {
      type: String,
      required: [true, "Password is required"],
    },
    services: {
      type: String,
      default: "shirt washing",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "service",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiDryCleanSchema = Joi.object({
  drycleaner: Joi.string().required(),
  description: Joi.string().required(),
  services: Joi.string(),
});

const DryCleaner = model("drycleaner", drycleanerSchema);

module.exports = {
  DryCleaner,
  joiDryCleanSchema,
};
