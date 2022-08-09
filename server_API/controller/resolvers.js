const { getAllTracksLikedByUser, getAllUsers, getOneUser } = require('../model.js');

const resolvers = {
  Query: {
    allUsers() {
      return getAllUsers()
        .then((results) => (results.rows));
    },
    user(_, { id }) {
      return getOneUser(Number(id))
        .then((results) => (results.rows[0]));
    },
  },

  User: {
    tracks_liked({ id }) {
      return getAllTracksLikedByUser(Number(id))
        .then((results) => (results.rows));
    },
  },
};

module.exports = resolvers;
