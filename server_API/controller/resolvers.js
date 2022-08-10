const axios = require('axios');
const qs = require('qs');
const { getAllTracksLikedByUser, getAllUsers, getOneUser } = require('../model.js');

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
            return null;
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
          return returnToClient;
        });
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
