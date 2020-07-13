const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const mongooseAsync = require("mongoose-async");
// const setters = require("./setters");
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

// BusinessSchema.pre("validate", async function (next) {
//   console.log(this)
//     let display = JSON.parse(this.displayName);
//     let description = JSON.parse(this.description);
//     console.log(display);
//   this.set(
//     {
//         displayName: [
//         await TextString.create({
//             hebrew: display.hebrew,
//             english: display.english
//   }).then((field) => field._id)],
//         description: [
//         await TextString.create({
//             hebrew: description.hebrew,
//             english: description.english
//   })
//         ]
//     }
//   )
//   next()
// });

// BusinessSchema.plugin(mongooseAsync)

module.exports = Business = mongoose.model("Business", BusinessSchema);
