const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BusinessSchema = new Schema(
  {
    displayName: {
      type: String,
    },
    description: {
      type: String,
    },
    visible: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Business = mongoose.model("Business", BusinessSchema);
