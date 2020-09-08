const express = require("express");
const router = express.Router();

const LanguageAPI = require("../api/language");

router.get("/", (req, res) => {
  LanguageAPI.getAll()
    .then((languages) => {
      res.json(languages);
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
