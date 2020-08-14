const Dish = require("../models/Dish");
const textAPI = require("./textString");
const imageUtil = require("../utils/image")


function getDish(id) {
  return Dish.findById(id)
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
      },
    })
    .populate({
      path: "businessId",
      populate: {
        path: "description",
      },
    });
}

function getManyDishes(condition = {}) {
  debugger
  return Dish.find(condition)
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
      },
    })
    .populate({
      path: "businessId",
      populate: {
        path: "description",
      },
    });
}

async function createDish(req) {
  debugger
  let { name, description, businessId, price, isHidden } = req.body;
  let { file } = req;

  name = await textAPI.create(JSON.parse(name)).catch((err) => {
    throw err;
  });

  description = await textAPI.create(JSON.parse(description)).catch((err) => {
    throw err;
  });

  let dish = new Dish({
    name,
    description,
    businessId,
    price,
    isHidden
  });

  if (file) {
    dish.image = await imageUtil.upload(file)
  } else {
    dish.image = {
      fileLink: "https://top-ten-images.s3.amazonaws.com/falafel-89098_1280.jpg",
      s3_key: "falafel-89098_1280.jpg"
    };
  }
  
  return Dish.create(dish);
}

async function deleteDish(id) {

  let dish = await Dish.findById(id);

  await textAPI
    .deleteMany([dish.name, dish.description])
    .catch((err) => {
      throw err;
    });

    await imageUtil.destroy(dish.image.s3_key);

    return Dish.deleteOne({ _id: id });
}

async function updateDish(id, req) {
  // debugger
  let { name, description, price, isHidden } = req.body;
  // debugger
  let { file } = req;
  // debugger
  let dish = await Dish.findById(id);
  // debugger
  if (name) {
    await textAPI.update(dish.name, JSON.parse(name)).catch((err) => {
      throw err;
    });
  }
  // debugger
  if (description) {
    await textAPI
      .update(dish.description, JSON.parse(description))
      .catch((err) => {
        throw err;
      });
  }
  debugger;

  debugger;
  // if (file) {
  //   debugger;
  //   dish.image = await imageUtil.upload(file);
  // }
  // dish.price = price;
  // dish.isHidden = isHidden;
  // dish.save()
  // .populate("name")
  // .populate("description")
  // .populate({
  //   path: "businessId",
  //   populate: {
  //     path: "displayName",
  //     path: "description",
  //   },
  // })
  let image = dish.image
  if (file) {
    debugger;
    image = await imageUtil.upload(file);
  }
  
  debugger;
  return Dish.findOneAndUpdate(
    { _id: id },
    { price, isHidden, image },
    { new: true, useFindAndModify: false },
    async (err, dish) => {
      debugger;
      if (err) {
        throw err;
      }
    }
  )
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
      },
    })
    .populate({
      path: "businessId",
      populate: {
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
