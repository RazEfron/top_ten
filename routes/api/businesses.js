const express = require("express");
const router = express.Router();

const Business = require("../../models/Business");

// Show
router.get("/:id", (req, res) => {
  Business.findById(req.params.id)
    .then((business) => {
        if (business) {
            res.json(business)
        } else {
            res.status(404).json("No Such Business");
        }
    })
    .catch((err) => res.status(404).json(err));
});

// Index
router.get("/", (req, res) => {
  Business.find({}, (err, businesses) => {
      if (businesses) {
          res.json(businesses)
      } else {
          res.status(404).json(err)
      }
  })
    .then((business) => res.json(business))
    .catch((err) => res.status(404).json(err));
});

// Create
router.post("/", (req, res) => {
   const newBusiness = new Business({
     displayName: JSON.stringify(req.body.displayName),
     description: JSON.stringify(req.body.description),
   });
        newBusiness
          .save()
          .then((business) => res.json(business))
          .catch((err) => res.json(err));
});

// Update
// .findOneAndUpdate(filter, update, {
//   new: true
// });

// Delete
router.delete("/:id", function (req, res) {
    Business.remove({ _id: req.params.id }, err => {
        if(err) console.log(err);
        console.log("Successful deletion");
    })
      .then(() => res.json("Business Deleted successfully"))
      .catch((err) => res.status(404).json(err));
});

module.exports = router;

