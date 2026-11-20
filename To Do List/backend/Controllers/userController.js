const jwt = require("jsonwebtoken");
const userInformation = require("./mockDatabase.js");

const userController = (req, res) => {
  // Get the username and password from the request query
  const { username, password } = req.body;

  // Validate input

  if (!username || !password) {
    return res

      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Find the user in the database
  const user = userInformation.find(
    (user) => user.username === username && user.password === password,
  );

  // If the user is not found, return an error message

  if (!user) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  const payload = {
    name: username,
  };

  // Sign the token

  const token = jwt.sign(JSON.stringify(payload), "Crasher", {
    algorithm: "HS256",
  });

  console.log(`User ${username} logged in`);

  res.send({ message: `Welcome back ${username}`, user: user, token: token });
};

module.exports = {
  userController,
};
