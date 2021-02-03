const jwt = require("jsonwebtoken");
const secret = process.env.secret;
const { AuthenticationError } = require("apollo-server");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, secret);
      } catch (err) {
        throw new AuthenticationError("Token invalid or expired.");
      }
    }
    throw new Error("There was a problem with the token.")
  }
  throw new Error("Issue with Authorization Header")
};
