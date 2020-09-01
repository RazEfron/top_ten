const express = require("express");
const router = express.Router();

const textAPI = require("../api/textString");

router.get("/:id", (req, res) => {
  textAPI
    .get(req.params.id)
    .then((text) => {
      if (text) {
        res.json(text);
      } else {
        res.status(404).json("No Such Text");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  textAPI
    .getMany()
    .then((text) => {
      if (text) {
        res.json(text);
      } else {
        res.status(404).json("No Such Text");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.post("/", (req, res) => {
  textAPI
    .create(req.body, req.headers.language)
    .then((text) => {
      if (text) {
        res.json(text);
      } else {
        res.status(404).json("No Such Text");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.put("/:id", function (req, res) {
  textAPI
    .update(req.params.id, req.body, req.headers.language)
    .then((text) => {
      if (text) {
        res.json(text);
      } else {
        res.status(404).json("No Such Text");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.delete("/:id", function (req, res) {
  textAPI
    .delete(req.params.id)
    .then(() => res.json("Business Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
