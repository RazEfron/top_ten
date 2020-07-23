const express = require("express");
const router = express.Router();

const reviewAPI = require("../api/review");

router.get("/:id", (req, res) => {
  reviewAPI.get(req.params.id)
    .then((review) => {
      if (review) {
        res.json(review);
      } else {
        res.status(404).json("No Such Review");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  reviewAPI.getMany()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/",  (req, res) => {
  reviewAPI.create(req.body)
    .then((review) => res.json(review))
    .catch((err) => res.json(err));
});

router.put("/:id", function (req, res) {
  reviewAPI.update(req.params.id, req.body)
      .then((review) => res.json(review))
      .catch((err) => res.json(err));
});

router.delete("/:id", function (req, res) {
  Review.deleteOne({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    console.log("Successful deletion");
  })
    .then(() => res.json("Review Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});


module.exports = router;
