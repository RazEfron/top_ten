const express = require("express");
const router = express.Router();

const listAPI = require("../api/list");

router.get("/:id", (req, res) => {
  listAPI.get(req.params.id)
    .then((dish) => {
      if (dish) {
        res.json(dish);
      } else {
        res.status(404).json("No Such List");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  listAPI.getMany()
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/", (req, res) => {
  listAPI.create(req.body)
    .then((list) => res.json(list))
    .catch((err) => res.json(err));
});

router.put("/:id", function (req, res) {
  listAPI.update(req.params.id, req.body)
      .then((list) => res.json(list))
      .catch((err) => res.json(err));
});

router.delete("/:id", function (req, res) {
  listAPI.delete(req.params.id)
    .then(() => res.json("List Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
