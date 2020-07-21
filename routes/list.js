const express = require("express");
const router = express.Router();

const List = require("../models/List");
const TextString = require("../models/TextString");
const ListVersion = require("../models/ListVersion");

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
        res.status(404).json("No Such List");
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

  console.log(currentVersionId)
  currentVersionId = await ListVersion.create(currentVersionId);

  let list = new List({
    name,
    description,
    currentVersionId,
    image
  });

  list.currentVersionId.listId = list.id; 

  if (image) {
    list.image.data = image;
    list.image.contentType = "image/png";
  }

  List.create(list)
    .then((list) => res.json(list))
    .catch((err) => res.json(err));
});

// Update
router.put("/:id", async function (req, res) {
  let { name, description, currentVersionId, image } = req.body;
  await List.findOne({ _id: req.params.id }, async (err, list) => {
    if (err) throw err;

    if (name) {
      await TextString.findOneAndUpdate(
        { _id: list.name },
        name,
        { new: true, useFindAndModify: false }
      )
        .then(() => delete req.body.name)
        .catch((err) => {
          throw err;
        });
    }

    if (description) {
      await TextString.findOneAndUpdate(
        { _id: list.description },
        description,
        { new: true, useFindAndModify: false }
      )
        .then(() => delete req.body.description)
        .catch((err) => {
          throw err;
        });
    }

    if (currentVersionId) delete req.body.currentVersionId;
    delete req.body.image;

    await List.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true, useFindAndModify: false}, async (err, list) => {
        if (image) {
            console.log(list.image)
            list.image.data = image;
            list.image.contentType = "image/png";
            console.log(list.image)
            await list.save()
        }
    })
      .then((list) => res.json(list))
      .catch((err) => res.json(err));
  });
});

// Change Version
router.put("/:id/version", async function (req, res) {
    List.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      useFindAndModify: false,
    })
      .then((list) => res.json(list))
      .catch((err) => res.json(err));
})

// Delete
router.delete("/:id", function (req, res) {
  List.deleteOne({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  })
    .then(() => res.json("List Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

// !! DELETE ALL !!
// router.delete("/", function (req, res) {
//   List.deleteMany({}, (err) => {
//     if (err) console.log(err);
//     console.log("Successful deletion");
//   })
//     .then(() => res.json("All lists deleted!!!"))
//     .catch((err) => res.status(404).json(err));
// });

module.exports = router;
