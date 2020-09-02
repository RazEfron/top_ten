const apiUtil = require("./apiUtil");
const _ = require("lodash");
const validator = require("./validations");

function sendForm(params, formInfo, setEntities) {
    
  if (formInfo.foreignKeys) {
    _.forEach(formInfo.foreignKeys, (value, key) => {
      params[key] = value;
    });
  }

  if (validator.paramsValidator(formInfo.entityName)) {
    let newParams = new FormData();
    _.forEach(params, (value, key) => {
      newParams.append(key, value);
    });
    params = newParams;
  }

  if (formInfo.httpMethod === "post") {
    apiUtil[formInfo.httpMethod](
      `/${formInfo.entityName}`,
      params,
      (entity) => setEntities({ [formInfo.entityName]: [entity] }),
      (err) => {
        console.log(err);
      }
    );
  } else {
    apiUtil[formInfo.httpMethod](
      `/${formInfo.entityName}/${formInfo.entity._id}`,
      params,
      (entity) => {
        setEntities({ [formInfo.entityName]: [entity] });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

module.exports = {
  sendForm,
};
