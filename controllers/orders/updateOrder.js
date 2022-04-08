const {
  order: { Order },
} = require("../../models/");

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const { role } = req.user;

  if (role === "admin") {
    const getOrder = await Order.findByIdAndUpdate(orderId, {
      status,
    });
    res.json({
      code: 200,
      data: { ...getOrder, status },
    });
    return;
  }

  res.status(403).json({
    code: 403,
    message: "Denied",
  });
};

module.exports = updateOrder;
