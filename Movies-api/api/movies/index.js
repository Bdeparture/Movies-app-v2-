import express from "express";
import movieModel from './movieModel';
import uniqid from "uniqid";
import asyncHandler from 'express-async-handler';
import {
    getMovie, getPopularMovies,  getUpcomingMovies, getMovieCredits, getMovieImages, getMovieReviews, getTopRatedMovies,getGenres,
} from '../tmdb-api';

const router = express.Router();
let Regex = /^[1-9][0-9]*$/;


router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
    else {
        const movie = await movieModel.findByMovieDBId(id);
        if (movie) {
            res.status(200).json(movie);
        }
        else {
            res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
        }
    }
}));

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
    else {
        // find reviews in list
        if (movieReviews.id == id) {
            res.status(200).json(movieReviews);
        }
        else {
            res.status(404).json({
                message: 'The resource you requested could not be found.',
                status_code: 404
            });
        }
    }
});

//Post a movie review
router.post("/:id/reviews", (req, res) => {
    const id = parseInt(req.params.id);

    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); //push the new review onto the list
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: "The resource you requested could not be found.",
            status_code: 404,
        });
    }
});

router.get('/tmdb/popular/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const popularMovies = await getPopularMovies(page);
    res.status(200).json(popularMovies);
}));

router.get('/tmdb/upcoming/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/topRated/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const topRatedMovies = await getTopRatedMovies(page);
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
    else {
        const movie = await getMovie(id);
        res.status(200).json(movie);
    }
    
}));

router.get('/tmdb/:id/movie_credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
    else {
        const credits = await getMovieCredits(id);
        res.status(200).json(credits);
    }
}));

router.get('/tmdb/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({ message: 'The resource you requested could not be found.', status_code: 404 });
    }
    else {
        const images = await getMovieImages(id);
        res.status(200).json(images);
    }
}));

router.get('/tmdb/:id/movieReviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieReviews = await getMovieReviews(id);
    res.status(200).json(movieReviews);
}));

export default router;
