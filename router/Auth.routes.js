const { Router } = require("express");
const { register, login } = require("../controllers/Auth.controllers");

const router = Router();

router.post("/register", register);
router.patch("/login", login);

module.exports = {
  authRouters: router,
};
