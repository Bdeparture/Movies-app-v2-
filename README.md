# Movies-app-v2

Sisi Chen

## Features

- More new API routes with parameterized URLs.
- All APIs used by the frontend are now processed by the backend.
- Authentication service changed from Firebase to backend.
- Almost fully React integration of GET and POST data to API.
- Only logged-in users can now favorite movies.
- New validation using regular expressions.
- Using swagger to document all APIs.

## Setup requirements

Enter `npm install` to install all the dependencies demanded.
Enter `npm start` to start the frontend.
Enter `npm run dev` to start the backend.

- Client URL: http://localhost:3000
- Server URL: http://localhost:8080

## API Configuration

Don't forget to create your own `.env` file.
---
REACT_APP_TMDB_KEY=Your tmdb api key
SECRET=your JWT secret
FAST_REFRESH=false
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb address
---

## API Design

find more information [movie_app](https://app.swaggerhub.com/apis-docs/chenAstra/movie_app/1.0.0)

### movies
- /api/movies
- /api/movies/tmdb/popular/page
- /api/movies/tmdb/upcoming/page
- /api/movies/tmdb/topRated/page
- /api/movies/tmdb/genres
- /api/movies/tmdb/:id
- /api/movies/tmdb/:id/movie_credit
- /api/movies/tmdb/:id/images
- /api/movies/tmdb/:id/reviews

### people

- /api/people
- /api/people/tmdb/peopleList/:page
- /api/people/tmdb/:id
- /api/people/tmdb/:id/peopleMovieCredits
- /api/people/tmdb/:id/peopleImages

### users

- /api/users
- /api/update/:id
- /api/delete/:id
- /api/users/:username/favourites
- /api/users/favourites

## Security and Authentication

if you do not login, this page can not be entered

- Favourite Movies Page (/users/favorites/)

## Integrating with React App

inheritage the [last app](https://github.com/Bdeparture/Movies-app)
use MongoDB to create database, and seperate the frontend and backend.
optimize the account logic.

## Independent learning (if relevant)

learn how to use swagger, handle asynchronous operations and something about JSON and YAML.