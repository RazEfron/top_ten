const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseAsync = require("mongoose-async");
const setters = require("./setters");

const BusinessSchema = new Schema(
  {
    displayName: {
      type: String,
      write: setters.textify,
    },
    description: {
      type: String,
      write: setters.textify,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

BusinessSchema.plugin(mongooseAsync)

module.exports = Business = mongoose.model("Business", BusinessSchema);
