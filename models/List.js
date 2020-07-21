const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    currentVersionId: { type: Schema.Types.ObjectId, ref: "ListVersion" },
    image: { data: Buffer, contentType: String },
    isHidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = List = mongoose.model("List", ListSchema);
