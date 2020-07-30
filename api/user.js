const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

function getUser(email) {
  debugger
  return User.findOne({ email });
}

function getManyUsers(condition = {}) {
  return User.find(condition);
}

async function createUser(body) {
  debugger
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(newUser.password, salt);

    newUser.password = hash;

    return User.create(newUser)
}

async function loginUser(body) {
  debugger

  let user = await User.findOne({ email: body.email })

  const { password } = body;
  return new Promise((resolve, reject) => {
    debugger
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const { id, email, isAdmin } = user;
        const payload = { id, email, isAdmin };
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          debugger
          resolve({
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
  
// function authCurrent(id, body) {
//   return TextString.findOneAndUpdate({ _id: id }, body, {
//     new: true,
//     useFindAndModify: false,
//   });
// }

module.exports = {
  get: getUser,
  getMany: getManyUsers,
  register: createUser,
  loginUser,
};
