const config = require("../config/authConfig.js");
const { users } = require("../models/db.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
require('dotenv').config();
const { exec } = require('child_process');

exports.allAccess = async (req, res) => {
  let allUsers = await users.find({ userconfirmation: true });
  res.status(200).json(allUsers);
};

exports.allNoAccess = async (req, res) => {
  let allUsers = await users.find({ userstate: false, userconfirmation: true });
  res.status(200).json(allUsers);
};

exports.allWithAccess = async (req, res) => {
  let allUsers = await users.find({ userstate: true, userconfirmation: true });
  res.status(200).json(allUsers);
};

exports.userBoard = async (req, res) => {
  try {
    let user = await users.findOne({ useremail: req.query.useremail, });
    res.status(200).json(user);
  }
  catch (err) {
    res.status(404).send({ message: 'User not found' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let username = "";
    username = req.body.useremail.substring(0, req.body.useremail.indexOf("@"));
    var yourscript = exec(`sh ./scripts/deleteUser.sh ${username}`,
      (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
      });
    await users.deleteOne({ useremail: req.body.useremail });
    res.status(200).json({ message: 'Succeeded' });
  }
  catch (err) {
    res.status(404).send({ message: 'Error Occurred' });
  }
}

exports.adminBoard = async (req, res) => {
  exec(`sh ./scripts/pbsnodesCluster${req.query.number}.sh`,
    (error, stdout, stderr) => {
      res.status(200).json({ stdout });
    });
};

exports.moduleavail = async (req, res) => {
  exec(`sh ./scripts/moduleavailCluster${req.query.number}.sh`,
    (error, stdout, stderr) => {
      res.status(200).json({ stderr });
    });
};

exports.adminChangeRole = async (req, res) => {
  try {
    let user = await users.findOne({ useremail: req.body.useremail, })
    let newRole = "";
    if (user.userrole == 'admin') {
      role = 'user';
    }
    else {
      role = 'admin';
    }
    await users.updateOne({ useremail: user.useremail }, { userrole: role });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.srtaemail,
        pass: process.env.srtapass
      }
    });
    var mailOptions = {
      from: process.env.srtaemail,
      to: user.useremail,
      subject: 'Role Change',
      text: `Hello ${user.userfirstname} \n Your Role Changed To : ${role}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).send({ message: 'Role Changed Succesfully' });
  }
  catch (err) {
    console.log(err);
    res.status(404).send({ message: 'User Not Found' });
  }
}

exports.adminChangeState = async (req, res) => {
  try {
    let user = await users.findOne({ useremail: req.body.useremail, })
    let state = !user.userstate
    let username = "";
    username = user.useremail.substring(0, user.useremail.indexOf("@"));
    if (user.useradded == false) {
      await users.updateOne({ useremail: user.useremail }, { userstate: true, useradded: true });
      var yourscript = exec(`sh ./scripts/addUser.sh ${user.userpassword} ${username} ${user.userfirstname} ${user.userlastname} ${user.useremail}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
        });
    }
    else {
      await users.updateOne({ useremail: user.useremail }, { userstate: state });
      if (state == true) {
        var yourscript = exec(`sh ./scripts/enableUser.sh ${username}`,
          (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
          });
      }
      else {
        var yourscript = exec(`sh ./scripts/disableUser.sh ${username}`,
          (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
          });
      }
    }



    await res.status(200).send({ message: `Admin Changed User : ${user.useremail} with Username : ${username} State to : ${state}` });

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.srtaemail,
        pass: process.env.srtapass
      }
    });

    let txt = ''
    if (state == true) {
      txt = `Hello ${user.userfirstname} \n Congratulations Your Account is now Ready \n Username : ${username} \n Password : ${user.userpassword}`;
    }
    else {
      txt = `Hello ${user.userfirstname} \n Your Account is currently set as Inactive \n Username : ${username}`;
    }
    var mailOptions = {
      from: process.env.srtaemail,
      to: user.useremail,
      subject: 'State Change',
      text: txt,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  catch (err) {
    console.log(err);
    res.send(500).json('Server Error');
  }

};

exports.contactus = async (req, res) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.srtaemail,
      pass: process.env.srtapass
    }
  });
  var mailOptions = {
    from: process.env.srtaemail,
    to: 'hpcproject2021@gmail.com',
    subject: 'Contact Us',
    text: `User ${req.query.email} sent us an Inquiry Stating : \n ${req.query.message}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}