const express = require("express");
const router = express.Router();

const Review = require("../../models/Review");
const ListVersion = require("../../models/ListVersion");
const TextString = require("../../models/TextString");

// Show
router.get("/:id", (req, res) => {
  Review.findById(req.params.id)
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .populate({
      path: "dishId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .populate({
      path: "versionId",
      populate: {
        path: "listId",
        populate: {
          path: "name",
          path: "description",
        },
      },
    })
    .then((review) => {
      if (review) {
        res.json(review);
      } else {
        res.status(404).json("No Such Review");
      }
    })
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  Review.find({})
    .populate("description")
    .populate({
      path: "businessId",
      populate: {
        path: "displayName",
        path: "description",
      },
    })
    .populate({
      path: "dishId",
      populate: {
        path: "name",
        path: "description",
      },
    })
    .populate({
      path: "versionId",
      populate: {
        path: "listId",
        populate: {
          path: "name",
          path: "description",
        },
      },
    })
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => res.status(404).json(err));
});

// Create
router.post("/", async (req, res) => {
  let { versionId, description, rating, businessId, dishId } = req.body;
  description = await TextString.create(description)
  .catch(err => console.log(err))

  let review = new Review({
    versionId,
    description,
    rating,
    businessId,
    dishId,
  });

  Review.create(review)
    .then(async (review) => {
      let listVersion = await ListVersion.findOne({ _id: review.versionId })
      listVersion.reviews.push(review);
      listVersion.save()
        .catch(err => console.log(err))
      res.json(review)
    })
    .catch((err) => res.json(err));
});

// Update
router.put("/:id", async function (req, res) {
  let {
    versionId,
    description,
    rating,
    businessId,
    dishId,
    overratedCount,
    underratedCount,
    isHidden
  } = req.body;

  await Review.findOne({ _id: req.params.id }, async (err, review) => {
    if (err) throw err;

    if (description) {
      await TextString.findOneAndUpdate(
        { _id: review.description },
        description,
        { new: true, useFindAndModify: false }
      )
        .then(() => delete req.body.description)
        .catch((err) => {
          throw err;
        });
    }

    if (versionId) delete req.body.versionId;
    if (businessId) delete req.body.businessId;
    if (dishId) delete req.body.dishId;

    await Review.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, useFindAndModify: false })
      .then((review) => res.json(review))
      .catch((err) => res.json(err));
  });
});

// Delete
router.delete("/:id", function (req, res) {
  Review.deleteOne({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  })
    .then(() => res.json("Review Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

// !! DELETE ALL !!
// router.delete("/", function (req, res) {
//   Review.deleteMany({}, (err) => {
//     if (err) console.log(err);
//     console.log("Successful deletion");
//   })
//     .then(() => res.json("All reviews deleted!!!"))
//     .catch((err) => res.status(404).json(err));
// });

module.exports = router;
