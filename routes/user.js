const express = require("express");
const router = express.Router();
const userAPI = require("../api/user");

const User = require('../models/User');

router.post("/register", async (req, res) => {
  let user = await userAPI.get(req.body.email)
    .catch(err => {
      if (err) { throw err }
    })

  if (user) {
      res
        .status(400)
        .json({ email: "A user has already registered with this address" });
    } else {
      userAPI.register(req.body)
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
});

router.post("/login", async (req, res) => {
  let user = await userAPI.get(req.body.email)

  if (!user) {
    return res.status(400).json("This user does not exist");
  }

  await userAPI.loginUser(user, req.body)
    .then(token => res.json(token))
    .catch(err => console.log(err))
});

// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email,
//       admin: req.user.admin
//     });
//   }
// );

module.exports = router;


