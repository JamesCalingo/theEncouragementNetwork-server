const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserInputError } = require("apollo-server");

const {
  validateRegistration,
  validateLogin,
} = require("../../utils/validator");

const secret = process.env.secret;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    { expiresIn: "30min" }
  );
};

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      const { errors, valid } = validateLogin(email, password);

      if (!valid) {
        throw new UserInputError("Invalid", { errors });
      }
      const user = await User.findOne({ email });
      if (!user) {
        errors.general =
          "We couldn't find you in our database. Check your email and password and try again.";
        throw new UserInputError("User not found.", { errors });
      }
      const matchPW = await bcrypt.compare(password, user.password);
      if (!matchPW) {
        errors.general =
          "Your password, sadly, does not match our records. Check your password and try again.";
        throw new UserInputError("Wrong Password", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(_, { registration: { email, password, confirmPW } }) {
      const { valid, errors } = validateRegistration(
        email,
        password,
        confirmPW
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ email });

      if (user) {
        throw new UserInputError("This email is in the database already.");
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({ email, password });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
