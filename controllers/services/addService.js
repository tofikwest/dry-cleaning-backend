const { Service } = require("../../models/service");
const { User } = require("../../models/user");

const addService = async (req, res) => {
  const { body } = req;

  const { id } = req.user;

  const verifyAdmin = await User.findById(id);

  if (verifyAdmin.role !== "admin") {
    res.status(403).json({
      code: 403,
      message: "dont have permission",
    });
    return;
  }

  const createDrycleaner = await Service.create(body);

  res.status(201).json({
    code: 201,
    message: "Service has been added",
    data: createDrycleaner,
  });
};

module.exports = addService;
