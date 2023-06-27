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
    createUser: async (parent,{ username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { email, password } ) => {
      const user = await User.findOne({email});

      if (!user) {
        throw new AuthenticationError('Could not find user');
      }
      const userPassword = await user.isCorrectPassword(password);

      if (!userPassword) {
        throw new AuthenticationError('Incorrect Password');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { userId, bookData }, context) => {
      if (context.user) {
          return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: {book:bookData} } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('User is not logged in');
    },
    removeBook: async (_parent, {book}, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks:book} },
          { new: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('User is not logged in');
    }
  }
};

module.exports = resolvers;
