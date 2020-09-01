const TextString = require("../models/TextString");
const validator = require("../validators/TextStringValidator");

function getTextString(id) {
  return TextString.findById(id);
}

function getManyTextStrings(condition = {}) {
  return TextString.find(condition);
}

function createTextString(body, language) {
  if (validator.languageValidator(language)) {
    let string = (string = { [language]: body });
    return TextString.create(string);
  } else {
    throw "Language is not supported";
  }
}

function deleteTextString(id) {
  return TextString.deleteOne({ _id: id });
}

function updateTextString(id, body, language) {
  if (validator.languageValidator(language)) {
    let string = (string = { [language]: body });
    return TextString.findOneAndUpdate({ _id: id }, string, {
      new: true,
      useFindAndModify: false,
    });
  } else {
    throw "Language is not supported";
  }
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
