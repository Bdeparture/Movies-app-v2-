import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';
import peopleRouter from './api/people';
import genresRouter from './api/genres';
import passport from './authenticate'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
app.use('/api/people', passport.authenticate('jwt', { session: false }), peopleRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});