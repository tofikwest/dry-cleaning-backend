const { User } = require("../../models/user");

const getAllUsers = async (req, res) => {
  const { id } = req.user;

  const verifyAdmin = await User.findById(id);

  if (verifyAdmin.role !== "admin") {
    res.status(403).json({
      code: 403,
      message: "deniad",
    });
    return;
  }

  const users = await User.find({ role: "client" });

  res.json({
    code: 200,
    data: users,
  });
};

module.exports = getAllUsers;
