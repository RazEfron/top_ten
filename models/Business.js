const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseAsync = require("mongoose-async");
const TextString = require("./TextString");

const BusinessSchema = new Schema(
  {
    displayName: {
      type: String,
      write: async (textField, schemaType, document) => {
        let obj = JSON.parse(textField)
        const newText = new TextString({
          hebrew: obj.hebrew,
          english: obj.english,
        });

        console.log(newText)
        await newText
          .save()
          .then((text) => (id = text._id))
          .catch((err) => console.log(""));
        // console.log(id);
        return id;
      }

    },
    description: {
      type: String,
      write: async (textField, schemaType, document) => {
        let obj = JSON.parse(textField);
        const newText = new TextString({
          hebrew: obj.hebrew,
          english: obj.english,
        });

        let id;
        console.log(newText);
        await newText
          .save()
          .then((text) => (id = text._id))
          .catch((err) => console.log(""));
        // console.log(id);
        return id;
      },
    },
    visible: {
      type: Boolean,
      default: true,
    }

  },
  {
    timestamps: true,
  }
);

BusinessSchema.plugin(mongooseAsync)

module.exports = Business = mongoose.model("Business", BusinessSchema);
