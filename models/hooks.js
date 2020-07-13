const TextString = require("./TextString");

module.exports = {
  preSaveHook: async function (object, next) {
    let array = [];
    let keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
      if (typeof object[keys[i]] === "string") {
        let val = JSON.parse(object[keys[i]]);
        array.push({ [keys[i]]: val });
      }
    }

    for (let i = 0; i < array.length; i++) {
      let obj = array[i];
      let key = Object.keys(obj)[0];
      this[key] = await TextString.create(obj[key]).then((field) => field._id);
    }
    next();
  }
};