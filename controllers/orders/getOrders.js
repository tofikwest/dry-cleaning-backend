const {
  order: { Order },
  user: { User },
  service: { Service },
} = require("../../models/");

const getOrders = async (req, res) => {
  const { id, role } = req.user;

  if (role === "admin") {
    const getAllOrders = await Order.find({});
    res.json({
      code: 200,
      data: getAllOrders,
    });
  }

  const getMyOrders = await Order.find({ owner: id });

  res.json({
    code: 200,
    data: getMyOrders,
  });
};

module.exports = getOrders;
