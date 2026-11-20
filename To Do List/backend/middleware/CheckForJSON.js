function checkForJSON(req, res, next) {
  if (!req.is("application/json")) {
    return res.status(415).json({ message: "Incorrect Data Type" });
  } else {
    next();
  }
}

module.exports = {
  checkForJSON,
};
