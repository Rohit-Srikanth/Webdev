const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    gender: { type: String, required: false },
    height: { type: mongoose.Types.Decimal128, required: false },
    weight: { type: mongoose.Types.Decimal128, required: false },
  })
);

module.exports = User;
