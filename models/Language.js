const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguageSchema = new Schema(
  {
    language: String
  }
);

module.exports = Language = mongoose.model("Language", LanguageSchema);
