const {
  user: { User },
} = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.comparePass(password)) {
    res.status(401).json({
      code: 401,
      message: "Email or password invalid!",
    });
    return;
  }

  const token = user.createToken();

  await User.findOneAndUpdate({ email }, { token });

  res.json({
    code: 200,
    token,
  });
};

module.exports = login;
