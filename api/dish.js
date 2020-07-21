const Dish = require("../models/Dish");
const textAPI = require("./textString");

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

async function createDish(body) {
  let { name, description, businessId, image, price, isHidden } = body;

  name = await textAPI.create(name).catch((err) => {
    throw err;
  });
  description = await textAPI.create(description).catch((err) => {
    throw err;
  });

  let dish = new Dish({
    name,
    description,
    businessId,
    image,
    price,
    isHidden
  });

  if (image) {
    dish.image.data = image;
    dish.image.contentType = "image/png";
  }
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
      { name, description, businessId, image, price, isHidden },
      { new: true, useFindAndModify: false },
      async (err, dish) => {
        if (err) { throw err }

        if (image) {
          dish.image.data = image;
          dish.image.contentType = "image/png";
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
