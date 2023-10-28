const { userModel } = require("../models/user.model");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "He39zDQW7RdkOcxe3L9qvoSQ/ef40BG6Ro4hrHDjE+U=";

async function register(req, res, next) {
  try {
    const salt = genSaltSync(10);
    const hash = hashSync(req.body.password, salt);
    const user = await userModel.create({
      fullName: req.body?.fullName,
      email: req.body?.email,
      password: hash,
    });
    res.status(200).send({ status: 200, user: user["_id"] });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) throw { statusCode: 404, message: "not found" };
    if (compareSync(req.body.password, user.password)) {
      const payload = {
        user: user._id,
      };
      const token = jwt.sign(payload, secret);
      res.status(200).send({
        statusCode: 200,
        token: token,
        message: "logged in",
      });
    } else {
      throw { statusCode: 404, message: "not founded" };
    }
  } catch (error) {
    next(error);
  }
  // res.status(200).send({ status: 200, message: req.body });
}

module.exports = {
  register,
  login,
};
