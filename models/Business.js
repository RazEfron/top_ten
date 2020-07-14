const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hooks = require('./hooks');
const TextString = require("./TextString");


const BusinessSchema = new Schema(
  {
    displayName: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    visible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Business = mongoose.model("Business", BusinessSchema);
