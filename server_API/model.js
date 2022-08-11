require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.PG_DATABASE,
});

const getAllTracksLikedByUser = (id) => {
  const query = `SELECT track_id AS id, title, artists, img_url, preview, uri
  FROM tracks RIGHT OUTER JOIN users_tracks ON tracks.id = users_tracks.track_id
  WHERE users_tracks.user_id = $1 ORDER BY users_tracks.id DESC`;
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

const addFavTrack = ({
  userId, trackId, title, artists, imgUrl, preview, uri,
}) => {
  const query = `WITH insert1 AS (INSERT INTO users_tracks (user_id, track_id)
  VALUES ($1, $2) ON CONFLICT (user_id, track_id) DO NOTHING),
  insert2 AS (INSERT INTO tracks (id, title, artists, img_url, preview, uri)
    VALUES ($2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING RETURNING *)
  SELECT * FROM insert2 UNION SELECT * FROM tracks where id = $2`;
  const values = [userId, trackId, title, artists, imgUrl, preview, uri];
  return pool.query(query, values);
};

module.exports = {
  getAllTracksLikedByUser, getAllUsers, getOneUser, addFavTrack,
};
