var jwt = require("jsonwebtoken");
var privateKey = process.env.SECRET_KEY;

const signJWTtoken = (data) => {
  return jwt.sign(data, privateKey, { expiresIn: "1d" });
};

const verifyJWTtoken = async (token) => {
  return jwt.verify(token, privateKey);
};
module.exports = { signJWTtoken, verifyJWTtoken };
