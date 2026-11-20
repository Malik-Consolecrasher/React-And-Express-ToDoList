const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.headers["authorization"];
    const tokenExtract = token.split(" ")[1];

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ messsage: "Invalid token sent" });
  }
}

module.exports = {
  verifyToken,
};
