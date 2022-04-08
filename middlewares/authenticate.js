const jwt = require("jsonwebtoken");
const {
  user: { User },
} = require("../models");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    res.status(401).json({
      code: 401,
      message: "Not authorization",
    });
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      code: 401,
      message: "Not authorization",
    });
  }
};

module.exports = authenticate;
