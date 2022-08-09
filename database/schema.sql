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
  id VARCHAR(255) PRIMARY KEY UNIQUE,
  title VARCHAR(255) NOT NULL,
  artists TEXT NOT NULL,
  img_url TEXT NOT NULL,
  preview TEXT,
  uri TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users_tracks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  track_id VARCHAR(255) NOT NULL REFERENCES tracks(id)
);

-- Add dummy data

INSERT INTO users (username, img_url) VALUES ('binh', 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80');
INSERT INTO users (username, img_url) VALUES ('gian', 'https://images.unsplash.com/photo-1633466876697-1eb9c820028d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2273&q=80');
INSERT INTO users (username, img_url) VALUES ('carson', 'https://images.unsplash.com/photo-1529335764857-3f1164d1cb24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80');

INSERT INTO tracks (id, title, artists, img_url, preview, uri) VALUES ('4FmlGIh8j09tHgNaQysenP', 'Show Me The Meaning', 'Backstreet Boys', 'https://i.scdn.co/image/ab67616d0000b2732160c02bc56f192df0f4986b', 'https://p.scdn.co/mp3-preview/530aba1b582276ac4631408553720266de5d8d11?cid=b6aa9a45750545ebb38896df35be4aa8', 'https://open.spotify.com/track/4FmlGIh8j09tHgNaQysenP');
INSERT INTO tracks (id, title, artists, img_url, preview, uri) VALUES ('59RYf8nulz9cINoOqZS703', 'As Long As You Love Me', 'Backstreet Boys', 'https://i.scdn.co/image/ab67616d0000b273dafd4b9261a1ab9acd53a53d', 'https://p.scdn.co/mp3-preview/4e0c19b9d308339d63062f3f7e41b31f1850e3d7?cid=b6aa9a45750545ebb38896df35be4aa8', 'https://open.spotify.com/track/59RYf8nulz9cINoOqZS703');
INSERT INTO tracks (id, title, artists, img_url, preview, uri) VALUES ('35o9a4iAfLl5jRmqMX9c1D', 'Larger Than Life', 'Backstreet Boys', 'https://i.scdn.co/image/ab67616d0000b2732160c02bc56f192df0f4986b', 'https://p.scdn.co/mp3-preview/a6d3cb39977ee037e6b1287de31f3def5b2f10c7?cid=b6aa9a45750545ebb38896df35be4aa8', 'https://open.spotify.com/track/6sbXGUn9V9ZaLwLdOfpKRE');

INSERT INTO users_tracks (user_id, track_id) VALUES (1, '4FmlGIh8j09tHgNaQysenP');
INSERT INTO users_tracks (user_id, track_id) VALUES (1, '59RYf8nulz9cINoOqZS703');
INSERT INTO users_tracks (user_id, track_id) VALUES (2, '35o9a4iAfLl5jRmqMX9c1D');
INSERT INTO users_tracks (user_id, track_id) VALUES (3, '59RYf8nulz9cINoOqZS703');
INSERT INTO users_tracks (user_id, track_id) VALUES (3, '35o9a4iAfLl5jRmqMX9c1D');
