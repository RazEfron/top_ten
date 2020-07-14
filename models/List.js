const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    currentVersionId: { type: Schema.Types.ObjectId, ref: "ListVersion" },
    image: { data: Buffer, contentType: String },
    visible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// ID  (L518284581)
// Name (Text ID)
// Description (Text ID)
// Image
// Visible (boolean, default True)
// Current Version ID


module.exports = List = mongoose.model("List", ListSchema);
