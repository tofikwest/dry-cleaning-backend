const authRoute = require("./api/auth");
const usersRoute = require("./api/users");
const ordersRoute = require("./api/orders");
const drycleanerRoute = require("./api/drycleaner");
const servicesRoute = require("./api/services");

module.exports = {
  usersRoute,
  ordersRoute,
  authRoute,
  drycleanerRoute,
  servicesRoute,
};
