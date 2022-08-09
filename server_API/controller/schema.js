const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    img_url: String
    tracks_liked: [Track!]!
  }

  type Track {
    id: ID!
    title: String!
    artists: String!
    img_url: String!
    preview: String
    uri: String!
  }

  type Query {
    allUsers: [User!]!
    user(id: ID): User
    searchATrack(title: String!, artists: String!): [Track!]
  }

  type Mutation {
    likeATrack(id: ID!, title: String!, artists: String!, img_url: String!, preview: String, uri: String!): [Track!]!
  }
`;

module.exports = typeDefs;
