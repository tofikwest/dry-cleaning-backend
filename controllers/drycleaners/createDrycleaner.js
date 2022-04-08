const {
  user: { User },
  drycleaner: { DryCleaner },
} = require("../../models");

const createDrycleaner = async (req, res) => {
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

  const createDrycleaner = await DryCleaner.create(body);

  res.status(201).json({
    code: 201,
    message: "Drycleaner has been added",
    data: createDrycleaner,
  });
};

module.exports = createDrycleaner;
