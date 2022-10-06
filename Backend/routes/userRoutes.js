const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/user", controller.userBoard);

  app.get(
    "/api/test/admin",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


  app.get(
    "/api/test/moduleavail",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.moduleavail
  );

  app.get(
    "/api/test/contactus",
    controller.contactus
  );

  app.get("/api/test/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allAccess);

  app.get("/api/test/allunaccepted",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allNoAccess);

  app.get("/api/test/allaccepted",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allWithAccess);

  app.put(
    "/api/test/adminChangeState",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminChangeState
  );

  app.put(
    "/api/test/deleteUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.put(
    "/api/test/adminChangeRole",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminChangeRole
  );

};