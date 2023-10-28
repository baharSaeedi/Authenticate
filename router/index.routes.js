const { Router } = require("express");
const { authRouters } = require("./Auth.routes");

const router = Router();

router.use("/auth", authRouters);

module.exports = {
  appRouters: router,
};
