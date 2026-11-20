const { userController } = require("../Controllers/userController.js");
const { checkForJSON } = require("../middleware/CheckForJSON.js");
const { checkGmail } = require("../middleware/checkGmail.js");

const loginRoute = (app) => {
  app.post("/Login", checkForJSON, checkGmail, userController);
};

module.exports = loginRoute;
