const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DishSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    businessId: { type: Schema.Types.ObjectId, ref: "Business" },
    image: { data: Buffer, contentType: String },
    price: Number,
    visible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Dish = mongoose.model("Dish", DishSchema);


