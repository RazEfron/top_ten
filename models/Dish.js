const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    businessId: { type: Schema.Types.ObjectId, ref: "Business" },
    image: {
      fileLink: String,
      s3_key: String,
    },
    price: Number,
    isHidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Dish = mongoose.model("Dish", DishSchema);
