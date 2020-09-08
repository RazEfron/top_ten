const apiUtil = require("./apiUtil");
const _ = require("lodash");
const validator = require("./validators");

function sendForm(params, formInfo, setEntities) {
    
  if (formInfo.foreignKeys) {
    _.forEach(formInfo.foreignKeys, (value, key) => {
      params[key] = value;
    });
  }

  if (validator.isForm(formInfo.entityName)) {
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

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

module.exports = {
  sendForm,
  formatDate
};
