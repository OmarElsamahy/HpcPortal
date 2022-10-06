const { verifySignUp , verifyPassword } = require("../middlewares");
const controller = require("../controllers/authController.js");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
    ],
    controller.signup
  );

  app.post(
    "/api/auth/signupadmin",
    [
      verifySignUp.checkDuplicateEmail,
      authJwt.isAdmin,
      authJwt.verifyToken,
    ],
    controller.signupadmin
  );

  app.get("/api/auth/confirmation/:token", controller.emailconfirmation);
  

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);

  
  app.get("/api/auth/user", controller.getUser);

  app.put(
    "/api/auth/resetpassword",
    [
      verifyPassword.checkPassword,
    ], 
    controller.resetpassword
  );

};