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
    createUser: async (_parent, {username, email, password}) => {
      const user = await User.create ({username, email, password})
      const token = signToken(user);

      return { user, token };
    },

    login: async (_parent, { username, email }) => {
      const user = await User.findOne({ $or:
         [{ email }, 
          { username }]
        });

      if (!user) {
        throw new AuthenticationError('No User found!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (_parent, { username, book }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { username: username },
          {
            $addToSet: { savedBooks: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteBook: async (_parent, { username, book }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { username: username },
          { $pull: { books: book } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  }


}

// context is a session




module.exports = resolvers;