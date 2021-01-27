const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { email, password, confirmPW } },
      context,
      info
    ) {
      password = await bcrypt.hash(password, 12)

      const user = new User({email, password, confirmPW})
      
      const res = await newUser.save()

      const token = jwt.sign({
        id: res.id,
        email: res.email,
      }, secret, {expiresIn: '30min'} )

      return {
        ...res.doc,
        id: res._id,
        token
      }
    },
  },
};
