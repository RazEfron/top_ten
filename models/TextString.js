const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TextStringSchema = new Schema(
  {
    hebrew: {
      type: String,
      required: true,
    },
    english: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = TextString = mongoose.model("TextString", TextStringSchema);
