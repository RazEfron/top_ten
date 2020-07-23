const List = require("../models/List");
const textAPI = require("./textString");
const versionAPI = require("./listVersion");


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

async function createList(body) {
  let { name, description, currentVersionId, image, isHidden } = body;
  
  name = await textAPI.create(name).catch((err) => {
    throw err;
  });
  description = await textAPI.create(description).catch((err) => {
    throw err;
  });

  
  currentVersionId = await versionAPI.create(currentVersionId).catch(err => {
    throw err;
  })

  let list = new List({
    name,
    description,
    currentVersionId,
    image,
    isHidden
  });

  currentVersionId.listId = list._id
  currentVersionId.save().catch(err => {
    throw err;
  })

  if (image) {
        dish.image = imageUtil.getImageObject(image);

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

  return List.deleteOne({ _id: id });
}

async function updateList(id, body) {
  let { name, description, currentVersionId, image, isHidden } = body;

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
      if (err) { throw err }

      if (image) {
        list.image.data = image;
        list.image.contentType = "image/png";
        await list.save();
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