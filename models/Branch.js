const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema(
  {
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    googlePlaceId: String,
    additionalInfo: Map,
    visible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Branch = mongoose.model("Branch", BranchSchema);
