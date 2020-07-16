const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListVersionSchema = new Schema(
  {
    listId: { type: Schema.Types.ObjectId, ref: "List" },
    text: { type: Schema.Types.ObjectId, ref: "TextString" },
    month: Number,
    year: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    visible: { type: Boolean, default: true },
  },

  {
    timestamps: true,
  }
);



module.exports = ListVersion = mongoose.model("ListVersion", ListVersionSchema);
