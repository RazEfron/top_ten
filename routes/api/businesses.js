const express = require("express");
const router = express.Router();

const Business = require("../../models/Business");
const TextString = require('../../models/TextString');

// Show
router.get("/:id", (req, res) => {
  Business.findById(req.params.id)
    .populate("displayName")
    .populate("description")
    .then((business) => {
      console.log(business.displayName)
      if (business) {
        res.json(business);
      } else {
        res.status(404).json("No Such Business");
      }
    })
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  Business.find({})
    .populate("displayName")
    .populate("description")
    .then((businesses) => {
      res.json(businesses);
    })
    .catch((err) => res.status(404).json(err));
});

// Create
router.post("/", async (req, res) => {
  let {displayName, description} = req.body;
  displayName = new TextString(displayName);
  description = new TextString(description);
    let business = new Business({
      displayName,
      description
    })
  Business.create(business)
      .then((business) => res.json(business))
      .catch((err) => res.json(err));
});

// Update
router.put("/:id", async function (req, res) {
  let { visible, displayName, description } = req.body
  await Business.findOne({ _id: req.params.id }, async (err, business) => {
    if (err) throw err

    if (displayName) await TextString.findOneAndUpdate({ _id: business.displayName }, displayName, {new: true, useFindAndModify: false})
    .catch((err) => {throw err});

    if (description) await TextString.findOneAndUpdate({ _id: business.description }, description, {new: true, useFindAndModify: false})
    .catch((err) => {throw err});

  })
  if (visible) {
    Business.findOneAndUpdate({ _id: req.params.id }, { visible }, { new: true, useFindAndModify: false })
      .then((business) => res.json(business))
      .catch((err) => res.json(err));
  }
});


// Delete
router.delete("/:id", function (req, res) {
    Business.deleteOne({ _id: req.params.id }, err => {
        if(err) console.log(err);
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

