# Interlude
## Features
With this web app a user will be able to keep track of their favorite songs and check out songs favorited by other users.

Hovering over any of these images will trigger a 30-second playback of the corresponding tracks.

In their personal page, users have the ability to search for a track by title and artists’ names, then select one among the available returned options to add to their favorite list.

Before favoriting any song, it is possible to check out a 30-second-max playback of each these options if playback is available (indicated by the display of a play button).

![Personal Page](https://i.imgur.com/cHSrMHj.png)

![Search Function on Personal Page](https://i.imgur.com/sRuSDc7.png)

![Other User Page](https://i.imgur.com/ZoHIxUM.png)

## Technologies Used
- [PostgreSQL](https://www.postgresql.org/) and [node-postgres](https://node-postgres.com/)
- [NodeJS](https://nodejs.dev/), [ExpressJS](https://expressjs.com/) and [Axios](https://axios-http.com/)
- [ReactJS](https://reactjs.org/) and [NextJS](https://nextjs.org/)
- [GraphQL](https://graphql.org/) and [Apollo Server and Apollo Client](https://www.apollographql.com/)

## To check out the project locally at its current state
- Make sure you have PostgreSQL installed on your computer
- In the root folder, `npm install` to get all dependency packages
- Pre-seed your local database by running the following commands in the root directory of the project:
  - `psql postgres -f ./database/schema.sql` (create tables & schema in the database)
  - `psql postgres -f ./database/seed.sql` (seed the database with dummy data)
- We will be using Spotify as our 3rd-party API. Sign up for an account or sign in with [Spotify Developers](https://developer.spotify.com/dashboard/login), then select the option to create an app. This will give you a `Client ID` and `Client Secret`.
- At this point you can programmatically do a conversion or use [an external website](https://www.base64encode.org/) to encode the following string to base-64 format: `[your Client ID]:[your Client Secret]` (so combining both the `Client ID` and the `Client Secret` with a `:` separating them).
- Create a `.env` file in the root folder with the following data:
  - `SPOTIFY_AUTH=[insert the code you just converted into base-64 format here, wrapping quotation marks (“ ") around the string]`
  - `PG_DATABASE=secret_project`
  - `HTML_SERVER_PORT=[choose a port number of your choice]`
- Then you will need to host 2 servers: one performs server-side rendering of the HTML string to return to your client, the other hosts our simple custom-made GraphQL API. :)
- `npm start` will start the first server, and `npm run server_api` will start the second.
- Now if you navigate to `localhost:[port number of your choice]`, that will be the client’s side of this app - and you are currently logged in as user “binh” with a few pre-seeded favorite tracks. Navigating to `localhost:4320` will take you to a sandbox to explore and interact with the simple GraphQL API that I have created.


## Project status
Currently on hold so that I can focus on higher-priority projects.


## Missing features
This project was completed over the span of 4 days so there is still a lot to be improved on. Some known issues:
- **The app is currently not implementing authentication or a log-in system.**
- The custom API can’t always handle non-Latin characters (such as Chinese) in track titles or artist names.
- Special characters and punctuation marks in search strings are not currently supported.
- The app is currently not supporting returning results beyond the initial 20 if your search query returns more than that.