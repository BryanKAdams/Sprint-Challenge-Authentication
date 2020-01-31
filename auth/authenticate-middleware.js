const jwt = require("jsonwebtoken");
const secrets = require("../auth/secrets");

module.exports = (req, res, next) => {
  if (process.env.DB_ENV === "testing") {
    next();
  } else {
    let token = req.headers.authorization;

    if (token) {
      let secret = secrets.jwtSecret;
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(401).json({ message: "Error decoding token" });
        } else {
          res.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(400).json({
        message: "No token provided (are you logged in?)."
      });
    }
  }
};
