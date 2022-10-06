const {users}= require("../models/db.js");
var bcrypt = require("bcryptjs");

checkPassword = (req, res, next) => {
    // Email
  try {
    console.log(req.body.useremail);
    let user = users.findOne({
      useremail: req.body.useremail
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user.userstate == false) {
        return res.status(401).send({ message: "User Not Yet Accepted." });
      }
      var passwordIsValid = false;
      if (req.body.userpassword == user.userpassword) {
        passwordIsValid = true;
      }
      if (!passwordIsValid) {
        return res.status(403).send({ message: "Invalid Password!" });
      }
      if (passwordIsValid) {
        next();
      }
    });
  }catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
    }
}

const verifyPassword = {
    checkPassword,
};

module.exports = verifyPassword;