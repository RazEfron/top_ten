const TextString = require("./TextString");

module.exports = {
  preSaveHook: function (next) {
    let object = this._doc;
    let keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      if (object[keys[i]].hebrew) {
        let val = keys[i];
        TextString.create(this[val], function (err, res) {
          if (err) throw err;
        });
      }
    }
    next();
  },
  
};