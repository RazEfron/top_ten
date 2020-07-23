const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

function getUser(email) {
  return User.findOne({ email });
}

function getManyUsers(condition = {}) {
  return User.find(condition);
}

function createUser(body) {
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);

    newUser.password = hash;

    return User.create(newUser)
}

function loginUser(user, body) {
  const { password } = body;
  return new Promise((resolve, reject) => {

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name };
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          resolve( {
            success: true,
            token: "Bearer " + token,
          });
        }
        );
      } else {
         reject("Incorrect password")
      }
    });
  })
}
  
function updateTextString(id, body) {
  return TextString.findOneAndUpdate({ _id: id }, body, {
    new: true,
    useFindAndModify: false,
  });
}

function deleteManyTextString(array) {
  return TextString.deleteMany({ _id: { $in: array } });
}

module.exports = {
  get: getUser,
  getMany: getManyUsers,
  register: createUser,
  loginUser,
};
