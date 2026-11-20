const userInformation = require("../Controllers/mockDatabase.js");
const { taskLengthChecker } = require("../middleware/taskLengthChecker.js");
const { verifyToken } = require("../middleware/verifyToken.js");

const addTaskRoute = (app) => {
  app.post("/AddTask", taskLengthChecker, verifyToken, (req, res) => {
    let userTask = req.body.task;
    let userID = Number(req.body.user);

    try {
      let user = userInformation.find((user) => user.id === userID);

      user.toDoList.push(userTask);
      console.log(user);
      res.send({ tasks: user.toDoList });
    } catch (error) {
      console.log(error);
      res.status(403).json({ messsage: "Unable to send Task" });
    }
  });
};

module.exports = addTaskRoute;
