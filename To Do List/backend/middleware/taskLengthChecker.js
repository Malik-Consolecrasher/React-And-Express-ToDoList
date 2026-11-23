const express = require("express");

function taskLengthChecker(req, res, next) {
  console.log(req.body);

  let task = req.body.task ?? req.body.newTask;

  console.log("The task is: " + task);

  if (typeof task === "string") {
    if (task.length > 140) {
      console.log(task.length);
      return res
        .status(403)
        .json({ message: "Task must be under 140 characters" });
    } else {
      console.log(task.length);
      next();
    }
  } else {
    return res.status(403).json({ message: "Somehow task not string" });
  }
}

module.exports = {
  taskLengthChecker,
};
