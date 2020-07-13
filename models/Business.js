const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hooks = require('./hooks');


const BusinessSchema = new Schema(
  {
    displayName: { type: String, ref: "TextString" },
    description: { type: String, ref: "TextString" },
    visible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

BusinessSchema.pre("save", function (next) {
  let obj = this._doc;
  hooks.preSaveHook.call(this, obj, next)
});

module.exports = Business = mongoose.model("Business", BusinessSchema);
