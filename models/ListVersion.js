const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListVersionSchema = new Schema(
  {
    listId: { type: Schema.Types.ObjectId, ref: "List" },
    date: { type: Date, default: Date.now },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    isHidden: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

module.exports = ListVersion = mongoose.model("ListVersion", ListVersionSchema);
