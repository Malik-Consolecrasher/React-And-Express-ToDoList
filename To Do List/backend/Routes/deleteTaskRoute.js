const userInformation = require("../Controllers/mockDatabase.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//Deletes an item from the database when its called

const deleteTaskRoute = (app) => {
  app.delete("/DeleteTask", verifyToken, (req, res) => {
    let userTask = req.body.task;
    let userID = Number(req.body.userID);

    try {
      let databaseUser = userInformation.find((user) => user.id === userID);

      if (databaseUser.toDoList.indexOf(userTask) === -1) {
        res.status(403).json({ messsage: "Cannot find task to edit" });
      } else {
      databaseUser.toDoList.splice(
        databaseUser.toDoList.indexOf(userTask),
        1,
      );
      res.send({ tasks: databaseUser.toDoList });
    }
    } catch (error) {
      console.log(error);
      res.status(403).json({ messsage: "Unable to Delete Task" });
    }
  });
};

module.exports = deleteTaskRoute;
