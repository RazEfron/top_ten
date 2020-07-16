const express = require("express");
const router = express.Router();

const Dish = require("../../models/Dish");
const TextString = require("../../models/TextString");

// Show
router.get("/:id", (req, res) => {
  Dish.findById(req.params.id)
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .then((dish) => {
      if (dish) {
        res.json(dish);
      } else {
        res.status(404).json("No Such Dish");
      }
    })
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  Dish.find({})
    .populate("name")
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .then((dishes) => {
      res.json(dishes);
    })
    .catch((err) => res.status(404).json(err));
});

// Create
router.post("/", async (req, res) => {
  let { name, description, businessId, image, price } = req.body;
  name = await TextString.create(name);
  description = await TextString.create(description);

  let dish = new Dish({
    name,
    description,
    businessId,
    image,
    price
  });

  if (image) {
    dish.image.data = image;
    dish.image.contentType = "image/png";
  }

  Dish.create(dish)
    .then((dish) => res.json(dish))
    .catch((err) => res.json(err));
});

// Update
router.put("/:id", async function (req, res) {
  let { name, description, businessId } = req.body;
  await Dish.findOne({ _id: req.params.id }, async (err, dish) => {
    if (err) throw err;

    if (name) {
      await TextString.findOneAndUpdate({ _id: dish.name }, name, {
        new: true,
        useFindAndModify: false,
      })
        .then(() => delete req.body.name)
        .catch((err) => {
          throw err;
        });
    }

    if (description) {
      await TextString.findOneAndUpdate(
        { _id: dish.description },
        description,
        { new: true, useFindAndModify: false }
      )
        .then(() => delete req.body.description)
        .catch((err) => {
          throw err;
        });
    }

    if (businessId) delete req.body.businessId;
    delete req.body.image;

    await Dish.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, useFindAndModify: false },
      async (err, dish) => {
        if (image) {
          console.log(dish.image);
          dish.image.data = image;
          dish.image.contentType = "image/png";
          console.log(dish.image);
          await dish.save();
        }
      }
    )
      .then((dish) => res.json(dish))
      .catch((err) => res.json(err));
  });
});

// Delete
router.delete("/:id", function (req, res) {
  Dish.deleteOne({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  })
    .then(() => res.json("Dish Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

// !! DELETE ALL !!
// router.delete("/", function (req, res) {
//   Dish.deleteMany({}, (err) => {
//     if (err) console.log(err);
//     console.log("Successful deletion");
//   })
//     .then(() => res.json("All Dishes deleted!!!"))
//     .catch((err) => res.status(404).json(err));
// });

module.exports = router;
