const Language = require("../models/Language");

function getAll() {
  return Language.find({})
}


module.exports = {
  getAll
};
