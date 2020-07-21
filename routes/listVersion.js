const express = require("express");
const router = express.Router();

const listVersionAPI = require("../api/listVersion");

router.get("/:id", (req, res) => {
  listVersionAPI.get(req.params.id)
    .then((ListVersion) => {
      if (ListVersion) {
        res.json(ListVersion);
      } else {
        res.status(404).json("No Such Version");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  listVersionAPI.getMany()
    .then((ListVersions) => {
      res.json(ListVersions);
    })
    .catch((err) => {
      console.log(err)
      res.status(404).json(err)});
});

router.post("/", (req, res) => {
  listVersionAPI.create(req.body)
    .then((listVersion) => res.json(listVersion))
    .catch((err) => res.json(err));
});

router.put("/:id", function (req, res) {
  listVersionAPI.update(req.params.id, req.body)
      .then((listVersion) => res.json(listVersion))
      .catch((err) => res.json(err));
});

router.delete("/:id", function (req, res) {
  listVersionAPI.delete(req.params.id)
    .then(() => res.json("Version Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;