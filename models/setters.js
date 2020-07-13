const TextString = require("./TextString");
const { text } = require("express");

module.exports = {
  textify: async (textField) => {
      console.log(textField)
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
          .catch((err) => console.log(err));
        // console.log(id);
        return id;
      }
}