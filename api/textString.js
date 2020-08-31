const TextString = require("../models/TextString");

function getTextString(id) {
  return TextString.findById(id);
}

function getManyTextStrings(condition = {}) {
  return TextString.find(condition);
}

function createTextString(body, language) {
  let string = language === "hebrew" ? {
    hebrew: body
  } : {
    english: body
  }
  return TextString.create(string);
}

function deleteTextString(id) {
  return TextString.deleteOne({ _id: id });
}

function updateTextString(id, body, language) {
  
  let string =
    language === "hebrew"
      ? {
          hebrew: body,
        }
      : {
          english: body,
        };
  return TextString.findOneAndUpdate({ _id: id }, string, {
    new: true,
    useFindAndModify: false,
  });
}

function deleteManyTextString(array) {
  return TextString.deleteMany({ _id: { $in: array } });
}

module.exports = {
  get: getTextString,
  getMany: getManyTextStrings,
  create: createTextString,
  update: updateTextString,
  delete: deleteTextString,
  deleteMany: deleteManyTextString,
};
