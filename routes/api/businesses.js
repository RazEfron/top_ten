const express = require("express");
const router = express.Router();

const Business = require("../../models/Business");


router.post("/", (req, res) => {
    // console.log(JSON.stringify(req.body.displayName));

   const newBusiness = new Business({
     displayName: JSON.stringify(req.body.displayName),
     description: JSON.stringify(req.body.description),
   });
        // console.log(newBusiness)
        newBusiness
          .save()
          .then((business) => res.json(business))
          .catch((err) => res.json(err));
    });

module.exports = router;
