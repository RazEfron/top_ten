const express = require("express");
const router = express.Router();

const TextString = require('../../models/TextString');

// Show
router.get("/:id", (req, res) => {
  TextString.findById(req.params.id)
    .then((text) => res.json(text))
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  TextString.find({})
    .then((text) => res.json(text))
    .catch((err) => res.status(404).json(err));
});

// Create
router.post("/", (req, res) => {
    // console.log(req.body)
    const newText = new TextString({
      hebrew: req.body.hebrew,
      english: req.body.english,
    });

    newText
      .save()
      .then((text) => res.json(text))
      .catch((err) => res.status(404).json(err));
  }
);

// Update
router.put("/:id", function (req, res) {
  TextString.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
    .then((text) => res.json(text))
    .catch((err) => res.status(404).json(err));
})

// Delete
router.delete("/:id", function (req, res) {
    TextString.deleteOne({ _id: req.params.id }, err => {
        if(err) console.log(err);
        console.log("Successful deletion");
    })
      .then(() => res.json("Business Deleted successfully"))
      .catch((err) => res.status(404).json(err));
});

module.exports = router;
