const express = require("express");
const router = express.Router();

const Branch = require("../../models/Branch");
const TextString = require('../../models/TextString');

// Show
router.get("/:id", (req, res) => {
  Branch.findById(req.params.id)
    .then((branch) => {
      if (branch) {
        res.json(branch);
      } else {
        res.status(404).json("No Such Branch");
      }
    })
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  Branch.find({})
    .then((branch) => {
      res.json(branch);
    })
    .catch((err) => res.status(404).json(err));
});

// Create
router.post("/", async (req, res) => {
  console.log(req.body)
  Branch.create(req.body)
      .then((branch) => res.json(branch))
      .catch((err) => res.json(err));
});

// Update
router.put("/:id", async function (req, res) {
 Branch.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      useFindAndModify: false,
    })
      .then((branch) => res.json(branch))
      .catch((err) => res.json(err));
});


// Delete
router.delete("/:id", function (req, res) {
    Branch.deleteOne({ _id: req.params.id }, err => {
        if(err) console.log(err);
        console.log("Successful deletion");
    })
      .then(() => res.json("Branch Deleted successfully"))
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
