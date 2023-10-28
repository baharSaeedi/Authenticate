const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const secret = "He39zDQW7RdkOcxe3L9qvoSQ/ef40BG6Ro4hrHDjE+U=";

async function checkAuth(req, res, next) {
  try {
    const auth = req?.headers?.authorization;
    const token = auth?.split(" ")[1];
    if (token) {
      const vrifyResult = jwt.verify(token, secret);
      const user = await userModel.findOne({ id: vrifyResult._id });
      if (!user) throw { statusCode: 404, message: "not found" };
      req.user = vrifyResult._id;
      return next();
    }
    throw { statusCode: 404, message: "not founded" };
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkAuth,
};
