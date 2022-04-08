const Joi = require("joi");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { Schema, model } = require("mongoose");

const { SECRET_KEY } = process.env;

const randomBalance = Math.floor(Math.random() * 500);

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    balance: {
      type: Number,
      default: randomBalance,
    },
    token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },
    orders: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  return (this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
};

userSchema.methods.comparePass = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id,
    balance: this.balance,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
};

const joiUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(14).required(),
  balance: Joi.number(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiUserSchema,
};
