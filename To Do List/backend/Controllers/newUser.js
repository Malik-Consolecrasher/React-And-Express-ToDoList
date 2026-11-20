const jwt = require("jsonwebtoken");

const userInformation = require("./mockDatabase.js");
//This module took like 2 hours (nope, more) to impliment (SAVE ME)

//What it does is takes a request of the "Post" and validates it first
//After validation, it then saves the result to mockDatabase, which can then be fetched by the GET route

const newUser = (req, res) => {
  const { username, password } = req.body;

  console.log(username + password);

  // Validate input

  if (!username || !password) {
    return res

      .status(400)
      .json({ message: "Username and password are required" });
  }

  const payload = {
    name: username,
  };

  // Sign the token

  const token = jwt.sign(JSON.stringify(payload), "Crasher", {
    algorithm: "HS256",
  });

  const newDBEntry = {
    id: userInformation[userInformation.length - 1].id + 1,
    username: username,
    password: password,
    toDoList: [],
  };
  userInformation.push(newDBEntry);
  console.log(newDBEntry);

  return res.send({ user: newDBEntry, token: token });
};

module.exports = {
  newUser,
};
