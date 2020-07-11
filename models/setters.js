const TextString = require("./TextString");
const { text } = require("express");

module.exports = {
  textify: async (textField) => {
      console.log(textField.hebrew);
    const newText = new TextString({
      hebrew: textField.hebrew,
      english: textField.english,
    });

    let id
    await newText
      .save()
      .then((text) => id = text._id)
      .catch((err) => console.log("BOOM"));
    console.log(id)
      return id
  },
}; 