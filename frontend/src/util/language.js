const _ = require("lodash");

function languageValidator(language) {
  return _.includes(["hebrew", "english"], language);
}

module.exports = {
  languageValidator,
};
