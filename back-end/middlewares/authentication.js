require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const authentication = (req, res, next) => {
  if (!req.headers.authorization)
    return res
      .status(401)
      .send({ message: "You're not Logged in, Please login to our site" });
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ message: "Please login again", error: err });
    }
    next();
  });
};

module.exports = authentication;
