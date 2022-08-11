const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    username: ID!
    img_url: String
    tracks_liked: [Track!]!
  }

  type Track {
    id: ID!
    title: String!
    artists: [String!]!
    img_url: String!
    preview: String
    uri: String!
  }

  type ExternalTracks {
    tracks: [Track!]
    previous: String
    next: String
  }

  type Query {
    allUsers: [User!]!
    user(username: ID!): User
    externalTracks(queryString: String!): ExternalTracks!
    track(title: String!, artists: String!): [Track!]
  }

  type Mutation {
    likeATrack(username: ID!, trackId: ID!, title: String!, artists: [String!]!, imgUrl: String!, preview: String, uri: String!): Track!
  }
`;

module.exports = typeDefs;
