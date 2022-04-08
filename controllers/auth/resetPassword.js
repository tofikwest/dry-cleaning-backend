const generator = require("generate-password");

const {
  user: { User },
} = require("../../models");

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const randomPass = generator.generate({
    length: 10,
    numbers: true,
  });

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      code: 404,
      message: "Email not found",
    });
    return;
  }

  const setPassForDB = user.setPassword(randomPass);

  await User.findOneAndUpdate({ email }, { password: setPassForDB });

  res.status(201).json({
    code: 201,
    newPass: randomPass,
  });
};

module.exports = resetPassword;
