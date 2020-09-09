const List = require("../models/List");
const textAPI = require("./textString");
const versionAPI = require("./listVersion");
const imageUtil = require("../utils/image");
const _ = require("lodash");

function getList(id) {
  return List.findById(id)
    .populate("name")
    .populate("description")
    .populate("currentVersionId");
}

function getManyLists(condition = {}) {
  return List.find(condition)
    .populate("name")
    .populate("description")
    .populate("currentVersionId");
}

async function createList(req, language) {
  debugger;
  let { name, description, date, isHidden } = req.body;
  let { file } = req;
  debugger;
  name = await textAPI.create(name, language).catch((err) => {
    throw err;
  });
  debugger;
  description = await textAPI.create(description, language).catch((err) => {
    throw err;
  });
  debugger;
  currentVersionId = await versionAPI.create({}).catch((err) => {
    throw err;
  });
  debugger;
  let list = new List({
    name,
    description,
    date,
    currentVersionId,
    isHidden,
  });
  debugger;
  currentVersionId.listId = list._id;
  currentVersionId.save().catch((err) => {
    debugger;
    throw err;
  });
  debugger;
  if (file) {
    list.image = await imageUtil.upload(file);
  } else {
    list.image = {
      fileLink:
        "https://top-ten-images.s3.amazonaws.com/falafel-89098_1280.jpg",
      s3_key: "falafel-89098_1280.jpg",
    };
  }

  return List.create(list);
}

async function deleteList(id) {
  let list = await List.findById(id);

  textAPI.deleteMany([list.name, list.description]).catch((err) => {
    throw err;
  });

  versionAPI.deleteMany(id).catch((err) => {
    console.log(err);
    throw err;
  });

  await imageUtil.destroy(list.image.s3_key);

  return List.deleteOne({ _id: id });
}

async function updateList(id, req, language) {
  let { name, description, date, isHidden } = req.body;
  let { file } = req;

  let list = await List.findById(id);
  if (name) {
    await textAPI.update(list.name, name, language).catch((err) => {
      throw err;
    });
  }
  if (description) {
    await textAPI
      .update(list.description, description, language)
      .catch((err) => {
        throw err;
      });
  }
  debugger;
  let image = list.image;
  debugger
  if (file) {
    debugger
    image = await imageUtil.upload(file);
  }
  debugger
  date = date ? date : list.date;
  debugger
  isHidden = _.isNil(isHidden) ? list.isHidden : isHidden;
  debugger;
  return List.findOneAndUpdate(
    { _id: id },
    { date, image, isHidden },
    { new: true, useFindAndModify: false },
    async (err, list) => {
      if (err) {
        throw err;
      }
    }
  )
    .populate("name")
    .populate("description")
    .populate("currentVersionId");
}

module.exports = {
  get: getList,
  getMany: getManyLists,
  create: createList,
  update: updateList,
  delete: deleteList,
};
