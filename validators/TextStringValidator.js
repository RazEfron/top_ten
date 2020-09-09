const _ = require("lodash")

function languageValidator(language) {
    return _.includes(process.env.SUPPORTED_LANGUAGES.split(","), language);
}

module.exports = {
    languageValidator
}