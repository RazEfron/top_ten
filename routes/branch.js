const express = require("express");
const router = express.Router();

const branchAPI = require("../api/branch");

router.get("/:id", (req, res) => {
  branchAPI.get(req.params.id)
    .then((branch) => {
      if (branch) {
        res.json(branch);
      } else {
        res.status(404).json("No Such Branch");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  branchAPI.getMany()
    .then((branch) => {
      res.json(branch);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/", (req, res) => {
  branchAPI.create(req.body)
      .then((branch) => res.json(branch))
      .catch((err) => res.json(err));
});

router.put("/:id", (req, res) => {
  branchAPI.update(req.params.id, req.body)
    .then((branch) => {
      if (branch) {
        res.json(branch);
      } else {
        res.status(404).json("No Such Branch");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.delete("/:id", function (req, res) {
  branchAPI.delete(req.params.id)
      .then(() => res.json("Branch Deleted successfully"))
      .catch((err) => res.status(404).json(err));
});

module.exports = router;
