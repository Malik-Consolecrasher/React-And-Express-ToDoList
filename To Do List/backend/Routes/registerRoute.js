const { newUser } = require("../Controllers/newUser.js");
const { checkForJSON } = require("../middleware/CheckForJSON.js");
const { checkGmail } = require("../middleware/checkGmail.js");

const registerRoute = (app) => {
  app.post("/Register", checkGmail, checkForJSON, newUser);
};

module.exports = registerRoute;
