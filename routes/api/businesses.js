const express = require("express");
const router = express.Router();

const Business = require("../../models/Business");
const textify = require("../../models/setters").textify;


router.post("/", (req, res) => {
    // console.log(req.body.displayName.hebrew);

    let displayName = req.body.displayName;
    let description = req.body.description;

    async () => {
        let diName = await textify(displayName)
        let deName = await textify(description)
        
        const newBusiness = new Business({
          displayName: diName,
          description: deName,
        });
        newBusiness
          .save()
          .then((business) => res.json(business))
          .catch((err) => res.json(err));
    }
  
});

module.exports = router;
