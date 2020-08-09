const Dish = require("../models/Dish");
const textAPI = require("./textString");
const imageUtil = require("../utils/image")
const fs = require("fs");


function getDish(id) {
  return Dish.findById(id)
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    });
}

function getManyDishes(condition = {}) {
  return Dish.find(condition)
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    });
}

async function createDish(body, file) {
  debugger
  var data = fs.readFileSync(file.path);
  debugger
  let { name, description, businessId, price, isHidden } = body;
  debugger
  name = await textAPI.create(JSON.parse(name)).catch((err) => {
    throw err;
  });
  description = await textAPI.create(JSON.parse(description)).catch((err) => {
    throw err;
  });
  debugger
  let dish = new Dish({
    name,
    description,
    businessId,
    price,
    isHidden
  });
  debugger
  if (file) {
    debugger
    dish.image = imageUtil.getImageObject(file.path);
  }
  debugger
  return Dish.create(dish)
}

async function deleteDish(id) {
  let dish = await Dish.findById(id);

  textAPI
    .deleteMany([dish.name, dish.description])
    .catch((err) => {
      throw err;
    });

    return Dish.deleteOne({ _id: id });
}

async function updateDish(id, body) {
  let { name, description, businessId, image, price, isHidden } = body;

  let dish = await Dish.findById(id);

  if (name) {
    await textAPI.update(dish.name, name).catch((err) => {
      throw err;
    });
  }

  if (description) {
    await textAPI.update(dish.description, description).catch((err) => {
      throw err;
    });
  }

  return Dish.findOneAndUpdate(
      { _id: id },
      { businessId, image, price, isHidden },
      { new: true, useFindAndModify: false },
      async (err, dish) => {
        if (err) { throw err }

        if (image) {
          dish.image = imageUtil.getImageObject(image);
          await dish.save();
        }
      }
    )
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    });
}

module.exports = {
  get: getDish,
  getMany: getManyDishes,
  create: createDish,
  update: updateDish,
  delete: deleteDish,
};
