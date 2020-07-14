const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hooks = require('./hooks');
const TextString = require("./TextString");


const BusinessSchema = new Schema(
  {
    displayName: { type: Schema.Types.ObjectId, ref: "TextString" },
    description: { type: Schema.Types.ObjectId, ref: "TextString" },
    visible: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

BusinessSchema.pre("save", function (next) {
  hooks.preSaveHook.call(this, next)
});

// BusinessSchema.pre("findOneAndUpdate", function (next) {
//   let update = this._update;
//   let ids = this.schema.paths
//   let keys = Object.keys(ids);
//   // console.log(ids);

//   for (let i = 0; i < keys.length; i++) {
//     let key = keys[i];
//     if (update[keys[i]].hebrew) {
//       TextString.create(this[val], function (err, res) {
//         if (err) throw err;
//       });
//     }
//   }
//   next();
//   next()
// });

module.exports = Business = mongoose.model("Business", BusinessSchema);
