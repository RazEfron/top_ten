const List = require("../models/List");
const textAPI = require("./textString");
const versionAPI = require("./listVersion");
const imageUtil = require("../utils/image");

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

async function createList(req) {
  let { name, description, currentVersionId, isHidden } = req.body;
  let { file } = req;

  name = await textAPI.create(name).catch((err) => {
    throw err;
  });

  description = await textAPI.create(description).catch((err) => {
    throw err;
  });

  currentVersionId = await versionAPI.create(currentVersionId).catch((err) => {
    throw err;
  });

  let list = new List({
    name,
    description,
    currentVersionId,
    isHidden,
  });

  currentVersionId.listId = list._id;
  currentVersionId.save().catch((err) => {
    throw err;
  });

  if (file) {
    dish.image = await imageUtil.upload(file);
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

async function updateList(id, req) {
  let { name, description, currentVersionId, isHidden } = req.body;
  let { file } = req;

  let list = await List.findById(id);

  if (name) {
    await textAPI.update(list.name, name).catch((err) => {
      throw err;
    });
  }

  if (description) {
    await textAPI.update(list.description, description).catch((err) => {
      throw err;
    });
  }

  return List.findOneAndUpdate(
    { _id: id },
    { currentVersionId, image, isHidden },
    { new: true, useFindAndModify: false },
    async (err, list) => {
      if (err) {
        throw err;
      }

      if (file) {
        await imageUtil.destroy(list.image.s3_key);
        await imageUtil.upload(file);
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
