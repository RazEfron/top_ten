const _ = require("lodash");

function languageValidator(language) {
  return _.includes(["hebrew", "english"], language);
}

function paramsValidator(entitiyName) {
  return _.includes(["dish", "list"], entitiyName);
}

module.exports = {
  languageValidator,
  paramsValidator
};
