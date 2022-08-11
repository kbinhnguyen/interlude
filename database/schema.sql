-- Run this file: psql postgres -f ./database/schema.sql

DROP DATABASE IF EXISTS secret_project;
CREATE DATABASE secret_project;

\c secret_project;

CREATE TABLE IF NOT EXISTS users (
  username VARCHAR(255) NOT NULL PRIMARY KEY,
  img_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tracks (
  id VARCHAR(255) PRIMARY KEY UNIQUE,
  title VARCHAR(255) NOT NULL,
  artists TEXT NOT NULL,
  img_url TEXT NOT NULL,
  preview TEXT,
  uri TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users_tracks (
  id SERIAL PRIMARY KEY,
  user_username VARCHAR(255) NOT NULL REFERENCES users(username),
  track_id VARCHAR(255) NOT NULL REFERENCES tracks(id),
  UNIQUE (user_username, track_id)
);

CREATE INDEX track_index_on_tracks ON tracks(id);
CREATE INDEX username ON users(username);
CREATE INDEX user_index_on_usertrack ON users_tracks (user_username);
CREATE INDEX track_index_on_usertrack ON users_tracks (track_id);