const apiUtil = require("./apiUtil");
const _ = require("lodash");

function sendForm(params, formInfo, onSucces) {
  debugger;
  if (_.some(params, (param) => param.key === "image")) {
    debugger;
    params = new FormData();
    _.forEach(params, (value, key) => params.append(key, value));
  }
  if (formInfo.httpMethod === "post") {
    apiUtil[formInfo.httpMethod](
      `/${formInfo.entityName}`,
      params,
      onSucces,
      (err) => {
        debugger;
        console.log(err);
      }
    );
  } else {
    apiUtil[formInfo.httpMethod](
      `/${formInfo.entityName}/${formInfo.entity._id}`,
      params,
      onSucces,
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
