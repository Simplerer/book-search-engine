const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: { // shorthand for an object method
    async me(_parent, args, context) {
      const { user } = context;
      const foundUser = await User.findOne({
        $or: [
          { _id: user ? user._id : args.id },
          { username: args.username }],
      });
      return foundUser;
    }
  },

  Mutation: {
    async addUser(_parent, { username, email, password }) {
      const user = await User.create({ username, email, password })
      const token = signToken(user);
      return { user, token };
    },

    async login(_parent, { email, password }) {
      const user = await User.findOne({email});

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      if (!user) {
        throw new AuthenticationError('No User found!');
      }
      // password validation
      const token = signToken(user);
      return { token, user };
    },

    async saveBook(_parent, args, context) {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    async removeBook(_parent, args, context) {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: args } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }


}

module.exports = resolvers;