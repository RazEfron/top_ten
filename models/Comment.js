const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    businessId: { type: Schema.Types.ObjectId, ref: "Business" },
    dishId: { type: Schema.Types.ObjectId, ref: "Dish" },
    userName: String,
    title: String,
    content: String,
    visible: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Comment = mongoose.model("Comment", BusinessSchema);
