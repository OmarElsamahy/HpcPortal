const {users}= require("../models/db.js");

checkDuplicateEmail = (req, res, next) => {
    // Email
    let user = users.findOne({
      useremail: req.body.useremail
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        console.log(err);
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
}

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;