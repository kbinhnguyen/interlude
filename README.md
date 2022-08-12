# rfp2205-mvp
Hey there!

Thanks for dropping by!

## Features
With this web app a user will be able to keep track of their favorite songs and check out songs favorited by other users. In the home (or feed page), clicking on any user will take one to the personal page of that particular user. Clicking on ‘Home’ in the navigation bar will take one back to the home page, and clicking on ‘Me’ will take the user to their personal page. 

In both a user’s personal page and any other users’ pages, all the favorite tracks are displayed as an image collage, and hovering over any of these images will trigger a 30-second playback of the corresponding tracks.

In their personal page, a user has the ability to search for a track by title and artists’ names, then select one (or none) among the available returned options to add to their favorite list.

Before favoriting any song though, one absolutely can check out a 30-second-max playback of each these options if they are available (indicated by the display of a play button)! (Unfortunately tracks by many popular artists such as Rihanna, Eminem, Maroon 5 etc. will not have playbacks available).

## Tech Stacks:
- PostgreSQL
- NodeJS
- ExpressJS
- NextJS
- ReactJS
- REST and GraphQL APIs (via Apollo Server and Apollo Client)

## Caveats
This project was completed over the span of 3 days so there is still a lot to be improved on. Some known issues:
- The custom API can’t always handle non-Latin characters (such as Chinese) in track titles or artist names.
- Special characters and punctuation marks in search strings are not currently supported by the app.
- The app is currently not supporting returning results beyond the initial 20 if your search query returns more than that.
- The app is also not implementing authentication or a log-in system.

Please check back at a later date for additional and perhaps cooler features. I will be continuing this project as time permits.

## Some questions you may have
### Q: Why did you decide to do server-side rendering for such a simple web app?
A: You're absolutely right. I didn't have to. But I wanted to use this MVP project as an opportunity to learn some new technologies and implement new concepts that are important to backend development as that is where I have the strongest interest.

### Q: Why did you decide to have your web app NOT integrated with users' Spotify accounts since the Spotify API does offer this option to developers?
A: The personal answer is that Spotify already has plenty of personal data on me and I don't want a 3rd-party developer to get access to that information. So I'd imagine that there are users out there who are just as concerned with their privacy. The web developer answer is that I get less granular data with this approach, and often, when inundated with too much information sometimes we don't know what to do with it. Choosing a simple-data route provided me with plenty of opportunities to practice ReactJS `useRef` in this project.

## To check out the project at its current state
- Make sure you have PostgreSQL installed on your computer.
- In the root folder, `npm install` to get all dependency packages
- Pre-seed your local database by running the following commands in the root directory of the projects:
  - `psql postgres -f ./database/schema.sql` (create tables & schema in the database)
  - `psql postgres -f ./database/seed.sql` (seed the database with dummy data)
- We will be using Spotify as our 3rd-party API. Sign up for an account or sign in with [Spotify Developers](https://developer.spotify.com/dashboard/login), then select the option to create an app. This will give you a `Client ID` and `Client Secret`.
- At this point you can programmatically do a conversion or use [an external website](https://www.base64encode.org/) to encode the following string to base-64 format: `[your Client ID]:[your Client Secret]` (so combining both the `Client ID` and the `Client Secret` with a `:` separating them).
- Create a `.env` file in your root folder with the following data:
  - `SPOTIFY_AUTH=[insert the code you just converted into base-64 format here, wrapping them around “ marks]`
  - `PG_DATABASE=secret_project`
  - `HTML_SERVER_PORT=[choose a port number of your choice]`
- Then you will need to host 2 servers: one performs server-side rendering of the HTML string to return to your client, the second hosts our simple custom-made GraphQL API. :)
- `npm start` will start the first server, and `npm run server_api` will start the second.
- Now if you navigate to `localhost:[port number of your choice]`, that will be the client’s side of this app - and you are currently logged in as user “binh” with a few pre-seeded favorite tracks. Navigating to `localhost:4320` will take you to a sandbox to explore and interact with the simple GraphQL API that I have created.

## Contact
If you encounter any bugs, issues or simply want to chat, please definitely reach out!
