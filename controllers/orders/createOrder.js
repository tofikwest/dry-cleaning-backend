const {
  order: { Order },
  user: { User },
  service: { Service },
} = require("../../models/");

const createOrder = async (req, res) => {
  const { title } = req.body;

  const { id, email } = req.user;

  const user = await User.findById(id);

  const service = await Service.findOne({ title });

  if (!service) {
    res.status(404).json({
      code: 404,
      message: "Not found",
    });
    return;
  }
  if (user.balance >= service.price) {
    const userBalance = await User.findByIdAndUpdate(id, {
      balance: user.balance - service.price,
    });

    await Order.create({ title });
    await Order.findOneAndUpdate({ title }, { owner: id });

    await User.findByIdAndUpdate(id, { orders: [...user.orders, { title }] });

    res.status(201).json({
      code: 201,
      message: "Your order is being processed",
      data: req.body,
      balance: userBalance.balance,
    });
  } else {
    res.status(403).json({
      code: 403,
      message: "You don't have enough money on your balance",
    });
    return;
  }
};

module.exports = createOrder;
