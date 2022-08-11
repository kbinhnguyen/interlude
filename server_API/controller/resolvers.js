const axios = require('axios');
const qs = require('qs');
const {
  getAllTracksLikedByUser, getAllUsers, getOneUser, addFavTrack,
} = require('../model.js');

require('dotenv').config();

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

    externalTracks(_, { queryString }) {
      return axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${process.env.SPOTIFY_AUTH}`,
        },
        data: qs.stringify({
          grant_type: 'client_credentials',
        }),
      })
        .then((res) => {
          const accessToken = res.data.access_token;
          return axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/search',
            params: {
              q: queryString,
              type: 'track',
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });
        })
        .then((res) => {
          if (res.data.tracks.total === 0) {
            const finalReturnToClient = {
              tracks: null,
              previous: null,
              next: null,
            };
            return finalReturnToClient;
          }
          const results = res.data.tracks.items;
          const returnToClient = [];
          results.forEach((result) => {
            const artistsList = [];
            result.artists.forEach((artist) => {
              artistsList.push(artist.name);
            });
            const img = result.album.images.find((image) => (
              image.height === 640
            )).url;
            const track = {
              id: result.id,
              title: result.name,
              artists: artistsList,
              img_url: img,
              preview: result.preview_url,
              uri: result.external_urls.spotify,
            };
            returnToClient.push(track);
          });
          const finalReturnToClient = {
            tracks: returnToClient,
            previous: res.data.tracks.previous,
            next: res.data.tracks.next,
          };
          return finalReturnToClient;
        });
    },
  },

  User: {
    tracks_liked({ id }) {
      return getAllTracksLikedByUser(Number(id))
        .then((results) => {
          const tracks = results.rows;
          tracks.forEach((track) => {
            track.artists = track.artists.split(' ,');
          });
          return tracks;
        });
    },
  },

  Mutation: {
    likeATrack(_, {
      userId, trackId, title, artists, imgUrl, preview, uri,
    }) {
      return addFavTrack({
        userId: Number(userId), trackId, title, artists: artists.join(', '), imgUrl, preview, uri,
      })
        .then((results) => {
          const track = results.rows[0];
          const res = {
            id: track.id,
            title: track.title,
            artists: track.artists.split(' ,'),
            img_url: track.img_url,
            preview: track.preview,
            uri: track.uri,
          };
          return res;
        });
    },
  },
};

module.exports = resolvers;

/*
Note that the resolver for field 'tracks_liked' of the User type here is for demonstrative purpose
of how GraphQL resolver functions work (it resolves all available fields for the User type first,
then if the schema and query include a field that wasn't found in the first default resolution, it
will look for a specific resolver for the field that wasn't included for that type - tracks_liked
of User in this case). To handle web-level traffic, the resolution time for this approach is
suboptimal as opposed to combining the resolution for all fields of that type into a single query
in the database. In this example, if I'm requesting info from ALL fields for 4 users, the server
will have to make 5 queries to the database (1 for getAll, and 1 of each of getAllTracksLikedByUser
for each user).
*/
