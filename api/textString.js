const TextString = require("../models/TextString");

function getTextString(id) {
    return TextString.findById(id);
}

function getManyTextStrings(condition = {}) {
    return TextString.find(condition)
}

function createTextString(body) {
    const { hebrew, english } = body
    return TextString.create({
        hebrew,
        english
    })
}

function deleteTextString(id) {
    return TextString.deleteOne({ _id: id });
}

function updateTextString(id, body) {
    console.log(body.hebrew)
    return TextString.findOneAndUpdate({ _id: id }, body, { new: true, useFindAndModify: false });
}

function deleteManyTextString(array) {
    return TextString.deleteMany({ _id: { $in: array }})
}

module.exports = {
    get: getTextString,
    getMany: getManyTextStrings,
    create: createTextString,
    update: updateTextString,
    delete: deleteTextString,
    deleteMany: deleteManyTextString
}