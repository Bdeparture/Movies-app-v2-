# Movie—app

Sisi Chen

GitHub：[Bdeparture/Movies-app (github.com)](https://github.com/Bdeparture/Movies-app/)

YouTube：[Movies-app show - YouTube](https://www.youtube.com/watch?v=9dKW28jqviY)

Website：[React App (movies-app-bdeparture.web.app)](https://movies-app-bdeparture.web.app/)

## Overview

A website for everyone who loves movies to find their favorite.

### Feature

- New page(/people;/toprate;/upcoming)
- A new homepage
- Pagination
- Sort
- Headersite optimization
- Caching support(useQueries)
- UI optimaization<
- Account setting(log in/log out/sign up)
- Auto-deployment



### Setup Requirements

Enter `npm install` to install all the dependencies demanded. If you already have a react-app, please enter the commands as follows and install these packages:

1. Material UI - `npm install @mui/material @emotion/react @emotion/styled`
2. React Router - `npm install react-router-dom`
3. React Query - `npm install react-query`

After installing all packages, use npm start to run this project.

Open [http://localhost:3000](http://localhost:3000/) to view it in your browser.

Notice: API Key is necessary to run successfully. A file `.env` in root folder should be created by custom. The content in the file is like:

`REACT_APP_TMDB_KEY = <<Your_TMDB_API>>`
`FAST_REFRESH = false`

## API Endpoints

In this project, [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) is used to get necessary data. Here is the list of API endpoints that used in this project.

- Movies
  - Movie details - /movie/{movie_id}
  - Movie credits - /movie/{movie_id}/credits
  - Movie review - /movie/{movie_id}/review
  - Movie image - /movie/{movie_id}/images
  - Popular movie list - /movie/popular
  - Top rated movie list - /movie/top_rated
  - Upcoming movie list - /movie/upcoming
- People
  - People details - /person/{person_id}
  - Popular people list - /person/popular
  - People movie credits - /person/{person_id}/movie_credits
- Genres
  - Movie genres - /genre/movie/list

## Routing

- / - display the home page
- /movies - display popular movies
- /movies/:id - display a particular movie
- /movies/upcoming - display upcoming movies
- /movies/toprate - display top-rated movies
- /movies/favorites - display the favorite movies of the user
- /people - display all popular people
- /people/:id - display a particular person
- /login - display the log in 
- /signup - display the sign up

## Independent Learning

### Firebase Authentication

Firebase Authentication was integrated into the project to provide a secure and user-friendly authentication system. Key aspects of my learning include:

- **User Sign-up and Login:** Implemented the functionality to allow users to sign up for an account using a valid email and password. Users can also log in to their accounts securely.

### Firebase Deployment

Firebase was utilized for the deployment of the Movies App, allowing for easy and efficient hosting. Here are the main points of my learning:

- **Firebase Hosting:** Explored the process of deploying a React Single Page Application (SPA) to Firebase Hosting. This involved configuring the Firebase project settings and deploying the app to a live server.