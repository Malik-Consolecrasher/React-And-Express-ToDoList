const userInformation = require("../Controllers/mockDatabase.js");
const { taskLengthChecker } = require("../middleware/taskLengthChecker.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//takes in two values from the body, finds one to delete, and replaces it with the second value

const addTaskRoute = (app) => {
  app.post("/EditTask", taskLengthChecker, verifyToken, (req, res) => {
    let oldTask = req.body.oldTask;
    let newTask = req.body.newTask;
    let userID = Number(req.body.user);

    try {
      if (userInformation[userID - 1].toDoList.indexOf(oldTask) === -1) {
        res.status(403).json({ messsage: "Cannot find task to edit" });
      } else {
        userInformation[userID - 1].toDoList.splice(
          userInformation[userID - 1].toDoList.indexOf(oldTask),
          1,
          newTask,
        );
        res.send({ tasks: userInformation[userID - 1].toDoList });
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({ messsage: "Unable to Edit Task" });
    }
  });
};

module.exports = addTaskRoute;
