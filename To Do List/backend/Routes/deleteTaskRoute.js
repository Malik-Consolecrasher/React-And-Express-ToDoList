const userInformation = require("../Controllers/mockDatabase.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const { checkForJSON } = require("../middleware/CheckForJSON.js");

//Deletes an item from the database when its called

const deleteTaskRoute = (app) => {
  app.delete("/DeleteTask", checkForJSON, verifyToken, (req, res) => {
    let userTask = req.body.task;
    let userID = Number(req.body.userID);

    try {
      let databaseUser = userInformation.find((user) => user.id === userID);

      if (databaseUser.toDoList.indexOf(userTask) === -1) {
        res.status(403).json({ message: "Cannot find task to edit" });
      } else {
      databaseUser.toDoList.splice(
        databaseUser.toDoList.indexOf(userTask),
        1,
      );
      res.send({ tasks: databaseUser.toDoList });
    }
    } catch (error) {
      console.log(error);
      res.status(403).json({ message: "Unable to Delete Task" });
    }
  });
};

module.exports = deleteTaskRoute;
