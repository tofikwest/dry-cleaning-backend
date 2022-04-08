const {
  user: { User },
} = require("../../models");

const registration = async (req, res) => {
  const { email, password, balance, role, orders } = req.body;

  const user = await User.findOne({ email });

  const newUser = new User({ email });

  if (user) {
    res.status(409).json({
      code: 409,
      message: "this email has been registered",
    });
    return;
  }

  const pass = newUser.setPassword(password);

  const data = {
    email,
    password: pass,
    balance,
    role,
    orders,
  };

  await User.create(data);

  res.status(201).json({
    code: 201,
    message: "Success register",
  });
};

module.exports = registration;
