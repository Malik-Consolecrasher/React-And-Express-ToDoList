function checkGmail(req, res, next) {
  const {username} = req.body;

  console.log(username);
  if (typeof username === "string" && username.endsWith("@gmail.com")) {
    next();
  } else {

    return res.status(403).json({ message: "Username Must Contain @gmail" });
  }
}

module.exports = {
  checkGmail,
};
