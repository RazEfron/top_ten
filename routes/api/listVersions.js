const express = require("express");
const router = express.Router();

const ListVersion = require("../../models/ListVersion");
const TextString = require("../../models/TextString");
const Review = require("../../models/Review");

// Show
router.get("/:id", (req, res) => {
  ListVersion.findById(req.params.id)
    .populate("text")
    .populate("reviews")
    .populate({
      path: "listId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .then((ListVersion) => {
      if (ListVersion) {
        res.json(ListVersion);
      } else {
        res.status(404).json("No Such Version");
      }
    })
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  ListVersion.find({})
    .populate("text")
    .populate("reviews")
    .populate({
      path: "listId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .then((ListVersions) => {
      res.json(ListVersions);
    })
    .catch((err) => {
      console.log(err)
      res.status(404).json(err)});
});

// All Versions of List
router.get("/:listId", (req, res) => {
  ListVersion.find({ listId: req.params.listId})
    .populate("text")
    .populate("reviews")
    .populate({
      path: "listId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .then((ListVersions) => {
      res.json(ListVersions);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

// Create
router.post("/", async (req, res) => {
  let { listId, text, month, year, reviews } = req.body;

  text = await TextString.create(text);

  let listVersion = new ListVersion({
    listId,
    text,
    month,
    year,
  });

  ListVersion.create(listVersion)
    .then((listVersion) => res.json(listVersion))
    .catch((err) => res.json(err));
});

// Create New Version
router.post("/:id", async (req, res) => {

  await ListVersion.findById(req.params.id)
    .populate("text")
    .populate({
      path: "reviews",
      populate: {
        path: "description",
      },
    })
    .exec(async function (err, listVersion) {
      if (err) console.log(err);

      listVersion._id = undefined;
      listVersion.isNew = true;

      let oldText = await TextString.findById(listVersion.text._id)

      listVersion.text = await TextString.create({
        hebrew: oldText.hebrew,
        english: oldText.english
      })

      let newReviews = [];
      for (let i = 0; i < listVersion.reviews.length; i++) {
        const review = listVersion.reviews[i];
        let { overratedCount, underratedCount, visible, versionId, description, rating, businessId, dishId } = review;
        description = await TextString.create({
          hebrew: oldText.hebrew,
          english: oldText.english,
        });
        let reviewObject = await Review.create({
          overratedCount,
          underratedCount,
          visible,
          versionId,
          rating,
          businessId,
          dishId,
          description,
        });
        console.log(reviewObject)
        newReviews.push(reviewObject)
      }
      listVersion.reviews = newReviews
      listVersion
        .save()
        .then((listVersion) => res.json(listVersion))
        .catch((err) => res.json(err));
    });
});

// Update
router.put("/:id", async function (req, res) {
  let { listId, text, month, year, reviews } = req.body;
  await ListVersion.findOne({ _id: req.params.id }, async (err, listVersion) => {
    if (err) throw err;

    if (text) {
      await TextString.findOneAndUpdate({ _id: listVersion.text }, text, {
        new: true,
        useFindAndModify: false,
      })
        .then(() => delete req.body.text)
        .catch((err) => {
          throw err;
        });
    }

    if (listId) delete req.body.listId;

    await ListVersion.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, useFindAndModify: false })
      .then((listVersion) => res.json(listVersion))
      .catch((err) => res.json(err));
  });
});

// Delete
router.delete("/:id", function (req, res) {
  ListVersion.deleteOne({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  })
    .then(() => res.json("Version Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

// !! DELETE ALL !!
// router.delete("/", function (req, res) {
//   ListVersion.deleteMany({}, (err) => {
//     if (err) console.log(err);
//     console.log("Successful deletion");
//   })
//     .then(() => res.json("All Versions deleted!!!"))
//     .catch((err) => res.status(404).json(err));
// });

module.exports = router;
