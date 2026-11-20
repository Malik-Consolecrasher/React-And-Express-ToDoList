const userInformation = require("../Controllers/mockDatabase.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//Deletes an item from the database when its called

const deleteTaskRoute = (app) => {
  app.delete("/DeleteTask", verifyToken, (req, res) => {
    let userTask = req.body.task;
    let userID = req.body.userID;

    try {
      userInformation[userID - 1].toDoList.splice(
        userInformation[userID - 1].toDoList.indexOf(userTask),
        1,
      );
      res.send({ tasks: userInformation[userID - 1].toDoList });
    } catch (error) {
      console.log(error);
      res.status(403).json({ messsage: "Unable to Delete Task" });
    }
  });
};

module.exports = deleteTaskRoute;
