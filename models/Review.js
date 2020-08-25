const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    versionId: {
      type: Schema.Types.ObjectId,
      ref: "ListVersion",
      required: true,
    },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    rating: Number,
    overratedCount: { type: Number, default: 0 },
    underratedCount: { type: Number, default: 0 },
    businessId: { type: Schema.Types.ObjectId, ref: "Business" },
    dishId: { type: Schema.Types.ObjectId, ref: "Dish" },
    isHidden: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

module.exports = Review = mongoose.model("Review", ReviewSchema);
