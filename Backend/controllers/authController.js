const config = require("../config/authConfig.js");
const { users } = require("../models/db.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
require('dotenv').config();
const { exec } = require('child_process');

exports.signup = async (req, res) => {
  try {
    console.log('signing up ', req.body.useremail);
    let user = await users.create({
      userfirstname: req.body.userfirstname,
      userlastname: req.body.userlastname,
      useremail: req.body.useremail,
      userpassword: req.body.userpassword,
      userstate: false,
      useradded: false,
      userconfirmation: false,
      userrole: "user",
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.srtaemail,
        pass: process.env.srtapass
      }
    });

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: '365d', // 24 hours
    });

    /////////// Url to change upon deployment
    let url = "http://192.168.15.205:8080/api/auth/confirmation/" + token;

    var mailOptions = {
      from: process.env.srtaemail,
      to: req.body.useremail,
      subject: 'User Sign Up Email Confirmation',
      text: `Hello ${req.body.userfirstname} \n You Have Signed Up \n Please Click on this link to confirm your account ${url}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: "User Created Successfully" });

  }
  catch (err) {
    res.status(500).json({ message: "An error has happened" });
    console.log("err in user creation");
    console.log(err);
  }
}

//Add Admin

exports.signupadmin = async (req, res) => {
  try {
    console.log('signing up ', req.body.adminemail);
    let user = await users.create({
      userfirstname: req.body.adminfirstname,
      userlastname: req.body.adminlastname,
      useremail: req.body.adminemail,
      userpassword: req.body.adminpassword,
      userstate: false,
      useradded: false,
      userconfirmation: false,
      userrole: "admin",
    });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.srtaemail,
        pass: process.env.srtapass
      }
    });

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: '365d', // 24 hours
    });

    /////////// Url to change upon deployment
    let url = "http://192.168.15.205:8080/api/auth/confirmation/" + token;

    var mailOptions = {
      from: process.env.srtaemail,
      to: req.body.adminemail,
      subject: 'Admin Sign Up Email Confirmation',
      text: `Hello ${req.body.adminfirstname} \n You Have Signed Up as Admin Please Click on this link to confirm your account ${url}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: "Admin Created Successfully" });
  }
  catch (err) {
    res.json({ message: "An error has happened" });
    console.log("err in user creation");
    console.log(err);
  }
}

exports.emailconfirmation = async (req, res) => {
  try {
    let token = req.params.token;
    let output;
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      output = decoded;
    });
    let user = await users.findOne({ _id: output.id });
    user.userconfirmation = true;
    user.save();

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.srtaemail,
        pass: process.env.srtapass
      }
    });

    let mailOptions = {
      from: process.env.srtaemail,
      to: 'srtacity0@gmail.com',
      subject: 'Sign Up',
      text: `Hello Admin \n ${user.userrole} : ${user.useremail} has Signed Up and is Awaiting Confirmation`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(200).send({ message: "Email Confirmed" });
  } catch (err) {
    next(err);
  }
}

exports.signin = (req, res) => {
  let user = users.findOne({
    useremail: req.body.useremail,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (user.userstate == false) {
        return res.status(401).send({ message: "User Not Yet Accepted." });
      }
      if (user.userconfirmation == false) {
        return res.status(401).send({ message: "User Email Not Yet Confirmed." });
      }

      var passwordIsValid = false;
      if (req.body.userpassword == user.userpassword) {
        passwordIsValid = true;
      }
      if (!passwordIsValid) {
        return res.status(403).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        userfirstname: user.userfirstname,
        userlastname: user.userlastname,
        useremail: user.useremail,
        userrole: user.userrole,
        token: token,
      });

    });

};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
}

exports.getUser = async (req, res) => {
  try {
    let token = req.session.token;
    if (!token) {
      return res.status(403).send({ message: "No token provided! Please Login" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      res.status(200).send({ message: decoded.id });
    });
  }
  catch (err) {
    res.status(404).json({ attributes: "Not Found" })
  }
}


exports.resetpassword = async (req, res) => {
  try {
    let user = await users.findOneAndUpdate({ useremail: req.body.useremail }, {
      userpassword: req.body.newpassword
    })

    let username = "";
    username = user.useremail.substring(0, user.useremail.indexOf("@"));
    var yourscript = exec(`sh ./scripts/resetUserPassword.sh ${req.body.newpassword} ${username}`,
      (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
      });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.srtaemail,
        pass: process.env.srtapass
      }
    });

    var mailOptions = {
      from: process.env.srtaemail,
      to: 'srtacity0@gmail.com',
      subject: 'User Password Reset',
      text: `Hello Admin \n User ${username} has Changed His Password`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    var mailOptions = {
      from: process.env.srtaemail,
      to: 'srtacity0@gmail.com',
      subject: 'User Password Reset',
      text: `Hello ${username} \n You Have Changed Your Password to ${req.body.newpassword}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });


    res.status(200).send({ message: "Password has succefully changed " });
  }
  catch (err) {
    res.status(404).send({ message: err });
  }
}