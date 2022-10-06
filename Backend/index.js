const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const { users } = require('./models/db.js');
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../Frontend/dist'));
app.use(
  cookieSession({
    name: "session",
    secret: process.env.Secret,
  })
);

// app.get("/", (req, res) => {
//     res.status(200).send({message : 'Home View'});
// });

require("./routes/authRoutes.js")(app);
require("./routes/userRoutes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});