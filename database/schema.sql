-- Run this file: psql postgres -f ./database/schema.sql

DROP DATABASE IF EXISTS secret_project;
CREATE DATABASE secret_project;

\c secret_project;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  img_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tracks (
  id BIGINT PRIMARY KEY UNIQUE,
  artists TEXT NOT NULL,
  year INTEGER NOT NULL,
  img_url TEXT NOT NULL,
  preview TEXT,
  uri VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_tracks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  track_id INTEGER NOT NULL REFERENCES tracks(id)
);