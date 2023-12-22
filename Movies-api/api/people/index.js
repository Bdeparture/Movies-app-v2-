import express from "express";
import asyncHandler from "express-async-handler";
import peopleModel from "./peopleModel";
import { getPeople, getPerson, getPeopleImages, getPeopleMovieCredits } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  let { page = 1, limit = 20 } = req.query; // destructure page and limit and set default values
  [page, limit] = [+page, +limit]; // trick to convert to numeric (req.query will contain string values)

  // Parallel execution of counting people and getting people using peopleModel
  const [total_results, results] = await Promise.all([
    peopleModel.estimatedDocumentCount(),
    peopleModel.find().limit(limit).skip((page - 1) * limit)
  ]);
  const total_pages = Math.ceil(total_results / limit); // Calculate total number of pages (= total No Docs/Number of docs per page) 

  // Construct return Object and insert into response object
  const returnObject = {
    page,
    total_pages,
    total_results,
    results
  };
  res.status(200).json(returnObject);
}));

router.get('/tmdb/people/:page', asyncHandler(async (req, res) => {
  const page = parseInt(req.params.page);
  const people = await getPeople(page);
  res.status(200).json(people);
}));

router.get('/tmdb/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const person= await getPerson(id);
  res.status(200).json(person);
}));

router.get('/tmdb/:id/peopleMovieCredits', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const peopleMovieCredits = await getPeopleMovieCredits(id);
  res.status(200).json(peopleMovieCredits);
}));

router.get('/tmdb/:id/peopleImages', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const peopleImages = await getPeopleImages(id);
  res.status(200).json(peopleImages);
}));

export default router;
