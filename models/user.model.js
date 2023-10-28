const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, unique: false },
  },
  { timestamps: true }
);

const userModel = model("userModel", user);

module.exports = { userModel };
