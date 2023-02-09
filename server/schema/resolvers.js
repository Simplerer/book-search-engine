const { User } = require('../models');

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
  }


}

// context is a session




module.exports = resolvers;