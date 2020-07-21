const ListVersion = require("../models/ListVersion");
const textAPI = require("./textString");

function getListVersion(id) {
  return ListVersion.findById(id)
    .populate("text")
    .populate("reviews")
    .populate({
      path: "listId",
      populate: {
        path: "name",
        path: "description",
      },
    });
}

function getManyListVersions(condition = {}) {
  return ListVersion.find(condition)
    .populate("text")
    .populate("reviews")
    .populate({
      path: "listId",
      populate: {
        path: "name",
        path: "description",
      },
    });
}

async function createListVersion(body) {
  let { listId, text, date, reviews, isHidden } = body;

  text = await textAPI.create(text).catch((err) => {
    throw err;
  });

  return ListVersion.create({
      listId, text, date, reviews, isHidden
  });
}

async function deleteListVersion(id) {
  let list = await List.findById(id);

  textAPI.delete(list.text).catch((err) => {
    throw err;
  });

  return ListVersion.deleteOne({ _id: id });
}

async function updateListVersion(id, body) {
  let { listId, text, date, reviews, isHidden } = body;

  let listVersion = await ListVersion.findById(id);

  if (text) {
    await textAPI.update(listVersion.text, text).catch((err) => {
      throw err;
    });
  }

  return ListVersion.findOneAndUpdate({ _id: id }, { listId, date, reviews, isHidden })
    .populate("text")
    .populate("reviews")
    .populate({
      path: "listId",
      populate: {
        path: "name",
        path: "description",
      },
    });
}

module.exports = {
  get: getListVersion,
  getMany: getManyListVersions,
  create: createListVersion,
  update: updateListVersion,
  delete: deleteListVersion,
};
