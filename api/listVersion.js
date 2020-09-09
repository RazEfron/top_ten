const ListVersion = require("../models/ListVersion");
const textAPI = require("./textString");
const reviewAPI = require("./review");

function getListVersion(id) {
  return ListVersion.findById(id)
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
  let { listId, date, reviews, isHidden } = body;

  return ListVersion.create({
    listId,
    date,
    reviews,
    isHidden,
  });
}

async function deleteListVersion(id) {
  let list = await List.findById(id);

  reviewAPI.deleteMany(list.reviews).catch((err) => {
    throw err;
  });

  return ListVersion.deleteOne({ _id: id });
}

async function updateListVersion(id, body) {
  let { date, isHidden } = body;

  return ListVersion.findOneAndUpdate(
    { _id: id },
    { date, isHidden }
  )
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
