const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const {users} = require("../models/db");

verifyToken = (req, res, next) => {
  let token = req.session.token;
  if (!token) {
    return res.status(403).send({ message: "No token provided! Please Login" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
    try{
    let user = users.findOne(req.params.useremail).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.userrole == "admin") {
            next();
            return;
        }
    else{
        res.status(403).send({ message: "Require Admin Role!" });
        return;
    }
  });
}catch(err){
    res.status(404).send( {message:"User Not Found"} );
}
};
const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;