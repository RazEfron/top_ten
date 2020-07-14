const express = require("express");
const router = express.Router();
const fs = require('fs')

const List = require("../../models/List");
const TextString = require("../../models/TextString");
const ListVersion = require("../../models/ListVersion");

// Show
router.get("/:id", (req, res) => {
  List.findById(req.params.id)
    .populate("name")
    .populate("currentVersionId")
    .populate("description")
    .then((list) => {
      if (list) {
        res.json(list);
      } else {
        res.status(404).json("No Such Business");
      }
    })
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  List.find({})
    .populate("name")
    .populate("currentVersionId")
    .populate("description")
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => res.status(404).json(err));
});

// Create
router.post("/", async (req, res) => {
  let { name, description, currentVersionId, image } = req.body;

  name = await TextString.create(name);
  description = await TextString.create(description);
  currentVersionId = await ListVersion.create(currentVersionId);

  let list = new Business({
    name,
    description,
    currentVersionId
  });

  if (image) {
    list.image.data = fs.readFileSync(image);
    list.image.contentType = "image/png";
  }

  List.create(list)
    .then((list) => res.json(list))
    .catch((err) => res.json(err));
});

// Update
router.put("/:id", async function (req, res) {
  let { displayName, description } = req.body;
  await Business.findOne({ _id: req.params.id }, async (err, business) => {
    if (err) throw err;

    if (displayName) {
      await TextString.findOneAndUpdate(
        { _id: business.displayName },
        displayName,
        { new: true, useFindAndModify: false }
      )
        .then(() => delete req.body.displayName)
        .catch((err) => {
          throw err;
        });
    }

    if (description) {
      await TextString.findOneAndUpdate(
        { _id: business.description },
        description,
        { new: true, useFindAndModify: false }
      )
        .then(() => delete req.body.description)
        .catch((err) => {
          throw err;
        });
    }
    console.log(req.body);
    await Business.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      useFindAndModify: false,
    })
      .then((business) => res.json(business))
      .catch((err) => res.json(err));
  });
});

// Delete
router.delete("/:id", function (req, res) {
  Business.deleteOne({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  })
    .then(() => res.json("Business Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

// !! DELETE ALL !!
// router.delete("/", function (req, res) {
//   Business.deleteMany({}, (err) => {
//     if (err) console.log(err);
//     console.log("Successful deletion");
//   })
//     .then(() => res.json("All businesses deleted!!!"))
//     .catch((err) => res.status(404).json(err));
// });

module.exports = router;
