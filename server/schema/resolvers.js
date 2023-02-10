const { saveBook } = require('../controllers/user-controller');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: { // shorthand for an object method
    async getSingleUser(_parent, args, context) {
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
    async createUser(_parent, { username, email, password }) {
      const user = await User.create({ username, email, password })
      const token = signToken(user);

      return { user, token };
    },

    async login(_parent, { username, email }) {
      const user = await User.findOne({
        $or:
          [{ email },
          { username }]
      });

      if (!user) {
        throw new AuthenticationError('No User found!');
      }

      const token = signToken(user);
      return { token, user };
    },

    async saveBook(_parent, args, context) {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: args.id },
          { $addToSet: { savedBooks: args.book } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    async deleteBook(_parent, args, context) {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: args.id },
          { $pull: { books: args.book } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }


}

// context is a session




module.exports = resolvers;