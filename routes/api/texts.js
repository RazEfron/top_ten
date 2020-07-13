const express = require("express");
const router = express.Router();

const TextString = require('../../models/TextString');

router.get("/:id", (req, res) => {
  TextString.findById(req.params.id)
    .then((text) => res.json(text))
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  TextString.find({})
    .then((text) => res.json(text))
    .catch((err) => res.status(404).json(err));
});

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

module.exports = router;
