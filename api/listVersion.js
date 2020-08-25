const ListVersion = require("../models/ListVersion");
const textAPI = require("./textString");
const reviewAPI = require("./review");

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

  if (text) {
    text = await textAPI.create(text).catch((err) => {
      throw err;
    });
  }

  return ListVersion.create({
    listId,
    text,
    date,
    reviews,
    isHidden,
  });
}

async function deleteListVersion(id) {
  let list = await List.findById(id);

  textAPI.delete(list.text).catch((err) => {
    throw err;
  });

  reviewAPI.deleteMany(list.reviews).catch((err) => {
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

  return ListVersion.findOneAndUpdate(
    { _id: id },
    { listId, date, reviews, isHidden }
  )
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

function deleteVersions(listId) {
  return ListVersion.deleteMany({ listId }, function (err, result) {
    if (err) {
      throw err;
    }
  });
}

module.exports = {
  get: getListVersion,
  getMany: getManyListVersions,
  create: createListVersion,
  update: updateListVersion,
  delete: deleteListVersion,
  deleteMany: deleteVersions,
};
