const express = require("express");
const router = express.Router();

const textAPI = require("../api/textString");
const businessAPI = require("../api/business");

router.get("/:id", (req, res) => {
  businessAPI.get(req.params.id)
    .then((business) => {
      if (business) {
        res.json(business);
      } else {
        res.status(404).json("No Such Business");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  businessAPI.getMany()
    .then((businesses) => {
      res.json(businesses);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/", async (req, res) => {
  businessAPI.create(req.body)
      .then((business) => res.json(business))
      .catch((err) => res.json(err));
});

router.put("/:id", async function (req, res) {
    businessAPI.update(req.params.id, req.body)
      .then((business) => res.json(business))
      .catch((err) => res.json(err));
});
   
router.delete("/:id", function (req, res) {
    businessAPI.delete(req.params.id)
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

