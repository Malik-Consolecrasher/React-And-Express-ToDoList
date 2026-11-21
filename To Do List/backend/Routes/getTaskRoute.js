const userInformation = require("../Controllers/mockDatabase.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const getTaskRoute = (app) => {
  app.get("/GetTask", verifyToken, (req, res) => {
    let userID = Number(req.query.UserID);

    try {
      let user = userInformation.find((user) => user.id === userID);

      console.log(user);
      res.send({ tasks: user.toDoList });
    } catch (error) {
      console.log(error);
      res.status(403).json({ messsage: "Unable to Get Task" });
    }
  });
};

module.exports = getTaskRoute;
