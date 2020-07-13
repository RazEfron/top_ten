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
      businesses.map((business) => {
        business.populate("displayName").populate("description");
      });
      res.json(businesses);
    })
    .catch((err) => res.status(404).json(err));
});

// Create

router.post("/", async (req, res) => {
    Business.create({
      displayName: JSON.stringify(req.body.displayName),
      description: JSON.stringify(req.body.description),
    })
      .then((business) => res.json(business))
      .catch((err) => res.json(err));
});

// Update
// .findOneAndUpdate(filter, update, {
//   new: true
// });

router.put("/:id", function (req, res) {
    Business.findOneAndUpdate(
      { _id: req.params.id },
      JSON.stringify(req.body),
      {
        new: true,
        useFindAndModify: false,
      }
    )
      .then((business) => res.json(business))
      .catch((err) => res.status(404).json(err));
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

module.exports = router;

