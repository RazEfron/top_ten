const TextString = require("../models/TextString");

function getTextString(id) {
  return TextString.findById(id);
}

function getManyTextStrings(condition = {}) {
  return TextString.find(condition);
}

function createTextString(hebrew) {
  return TextString.create({
    hebrew,
    english: "",
  });
}

function deleteTextString(id) {
  return TextString.deleteOne({ _id: id });
}

function updateTextString(id, hebrew) {
  return TextString.findOneAndUpdate(
    { _id: id },
    { hebrew },
    {
      new: true,
      useFindAndModify: false,
    }
  );
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
