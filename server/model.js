require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  database: process.env.PG_DATABASE,
});

const getAllTracks = ({id}) => {
  const query = `SELECT * FROM tracks RIGHT OUTER JOIN users_tracks
  ON tracks.id = users_tracks.track_id WHERE users_tracks.user_id = ${id}`;

  return pool.query(query)
    // .then((results) => {
    //   console.log(results.rows);
    // })
    .catch((err) => {
      console.log(err);
    });
};

const getAllUsers = () => {
  const query = 'SELECT * FROM users';

  return pool.query(query)
    .then((results) => { console.log(results.rows); })
    .catch((err) => { console.log(err); });
};

module.exports = { getAllTracks, getAllUsers };
