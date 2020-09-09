const _ = require("lodash");
const FORM_ENTITIES = ["dish", "list"];
const ENTITIES_WITHOUT_FOREIGN_KEYS_PARAMS = ["branch", ""];

function languageValidator(languages, language) {
  return _.includes(languages, language);
}

function isForm(entitiyName) {
  return _.includes(FORM_ENTITIES, entitiyName);
}

function hasForeignKeys(entity) {
  return _.includes(ENTITIES_WITHOUT_FOREIGN_KEYS_PARAMS, entity);
}

module.exports = {
  languageValidator,
  isForm,
  hasForeignKeys
};
