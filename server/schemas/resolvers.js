const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const data = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return data;
      }
      throw new AuthenticationError("User is not logged in");
    }
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, args) => {
      const user = await User.findOne(args);

      if (!user) {
        throw new AuthenticationError('Could not find user');
      }
      const userPassword = await user.isCorrectPassword(args.password);

      if (!userPassword) {
        throw new AuthenticationError('Incorrect Password');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const { book } = args;
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('User is not logged in');
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const { bookId } = args;
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('User is not logged in');
    }
  }
};

module.exports = resolvers;
