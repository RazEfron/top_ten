const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    versionId: { type: Schema.Types.ObjectId, ref: "ListVersion", required: true },
    description: { type: Schema.Types.ObjectId, ref: "TextString", required: true },
    rating: Number,
    overratedCount: { type: Number, default: 0 },
    underratedCount: { type: Number, default: 0 },
    businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    dishId: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
    visible: { type: Boolean, default: true },
  },

  {
    timestamps: true,
  }
);

module.exports = Review = mongoose.model("Review", ReviewSchema);