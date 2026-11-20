function checkGmail(req, res, next) {
  const { username, password } = req.body;

  console.log(username);
  if (username.split("@")[1] !== "gmail.com") {
    return res.status(403).json({ message: "Username Must Contain @gmail" });
  } else {
    next();
  }
}

module.exports = {
  checkGmail,
};
