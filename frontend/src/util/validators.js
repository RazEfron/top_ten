const _ = require("lodash");

function languageValidator(language) {
  return _.includes(["hebrew", "english"], language);
}

function paramsValidator(entitiyName) {
  return _.includes(["dish", "list"], entitiyName);
}

function foreignKeysValidator(entity) {
  return _.includes(["branch", ""], entity)
}

module.exports = {
  languageValidator,
  paramsValidator,
  foreignKeysValidator
};
