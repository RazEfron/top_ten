const apiUtil = require("./apiUtil");
const _ = require("lodash");
const validator = require("./validations");

function sendForm(params, formInfo, setEntities) {
  debugger;
  if (validator.paramsValidator(formInfo.entityName)) {
    debugger;
    let newParams = new FormData();
    _.forEach(params, (value, key) => {
        debugger
        newParams.append(key, value);});
        params = newParams
  }
  if (formInfo.httpMethod === "post") {
    apiUtil[formInfo.httpMethod](
      `/${formInfo.entityName}`,
      params,
      (entity) => setEntities({ [formInfo.entityName]: [entity] }),
      (err) => {
        debugger;
        console.log(err);
      }
    );
  } else {
    apiUtil[formInfo.httpMethod](
      `/${formInfo.entityName}/${formInfo.entity._id}`,
      params,
      (entity) => {
        debugger;
        setEntities({ [formInfo.entityName]: [entity] });
      },
      (err) => {
        debugger;
        console.log(err);
      }
    );
  }
}

module.exports = {
  sendForm,
};
