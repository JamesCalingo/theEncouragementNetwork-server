const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserInputError } = require("apollo-server")

const secret = process.env.secret;

module.exports = {
  Mutation: {
    async register(
      _,
      { registration: { email, password, confirmPW } },
      
    ) {
      const user = await User.findOne({email})

      if(user){
        throw new UserInputError("This email is in the database already.")
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({ email, password });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
        },
        secret,
        { expiresIn: "30min" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
