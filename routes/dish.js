const express = require("express");
const router = express.Router();
const upload = require("../utils/multer").upload;
const passport = require("passport");

const dishAPI = require("../api/dish");

router.get("/:id", (req, res) => {
  dishAPI
    .get(req.params.id)
    .then((dish) => {
      if (dish) {
        res.json(dish);
      } else {
        res.status(404).json("No Such Dish");
      }
    })
    .catch((err) => res.status(404).json(err));
});

router.get("/", (req, res) => {
  debugger
  dishAPI
    .getMany()
    .then((dishes) => {
      res.json(dishes);
    })
    .catch((err) => res.status(404).json(err));
});

router.post(
  "/",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    debugger
    dishAPI
      .create(req, req.headers.language)
      .then((dish) => {
        res.json(dish);
      })
      .catch((err) => res.json(err));
  }
);

router.put(
  "/:id",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    debugger
    dishAPI
      .update(req.params.id, req, req.headers.language)
      .then((dish) => {
        debugger
        res.json(dish);
      })
      .catch((err) => {
        debugger
        res.json(err);
      });
  }
);

router.delete("/:id", function (req, res) {
  dishAPI
    .delete(req.params.id)
    .then(() => res.json("Dish Deleted successfully"))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
