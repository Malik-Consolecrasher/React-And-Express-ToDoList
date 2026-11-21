const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const token = req.headers["authorization"];
    const tokenExtract = token.split(" ")[1];

    const payload = jwt.verify(tokenExtract, "Crasher");

    res.payload = payload;
    
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ messsage: "Invalid token sent" });
  }
}

module.exports = {
  verifyToken,
};
