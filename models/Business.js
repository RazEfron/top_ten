const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
  {
    displayName: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    isHidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Business = mongoose.model("Business", BusinessSchema);
