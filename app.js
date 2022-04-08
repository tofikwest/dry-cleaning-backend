const express = require("express");

const cors = require("cors");

require("dotenv").config();

const {
  usersRoute,
  ordersRoute,
  authRoute,
  drycleanerRoute,
  servicesRoute,
} = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", authRoute);

app.use("/api/v1/users", usersRoute);

app.use("/api/v1/orders", ordersRoute);

app.use("/api/v1/drycleaners", drycleanerRoute);

app.use("/api/v1/services", servicesRoute);

app.use((_, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((error, _, res, __) => {
  const { status = 500, message = "Server is down" } = error;

  res.status(status).json({
    status,
    message,
  });
});

module.exports = app;
