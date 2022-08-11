require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.PG_DATABASE,
});

const getAllTracksLikedByUser = (id) => {
  const query = `SELECT track_id AS id, title, artists, img_url, preview, uri
  FROM tracks RIGHT OUTER JOIN users_tracks ON tracks.id = users_tracks.track_id
  WHERE users_tracks.user_id = $1`;
  const values = [id];
  return pool.query(query, values);
};

const getAllUsers = () => {
  const query = 'SELECT * FROM users';
  return pool.query(query);
};

const getOneUser = (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  return pool.query(query, values);
};

const addFavTrack = ({ userId, trackId, title, artists, imgUrl, preview, uri }) => {
  const query = `WITH inserted AS (INSERT INTO tracks (id, title, artists, img_url,
    preview, uri) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING)
    INSERT INTO users_tracks (user_id, track_id) VALUES ($7, $1)`;
  const values = [trackId, title, artists, imgUrl, preview, uri, userId];
  return pool.query(query, values);
};

module.exports = { getAllTracksLikedByUser, getAllUsers, getOneUser, addFavTrack };
