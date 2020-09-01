const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TextStringSchema = new Schema(
  {
    hebrew: { type: String, default: "" },
    english: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = TextString = mongoose.model("TextString", TextStringSchema);
