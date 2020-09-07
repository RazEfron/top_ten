const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    currentVersionId: { type: Schema.Types.ObjectId, ref: "ListVersion" },
    image: {
      fileLink: String,
      s3_key: String,
    },
    date: { type: Date, default: Date.now },
    isHidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = List = mongoose.model("List", ListSchema);
