import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';
import peopleRouter from './api/people';
import authenticate from './authenticate';

dotenv.config();

const app = express();
var swaggerInstall = require("./swagger");
swaggerInstall(app);
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', authenticate, moviesRouter);
app.use('/api/people', authenticate, peopleRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});