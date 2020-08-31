const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    isAdmin: { type: Boolean, default: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    language: { type: String, default: "hebrew"}
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("User", UserSchema);
