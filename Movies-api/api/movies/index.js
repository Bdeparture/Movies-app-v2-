import express from "express";
import movieModel from './movieModel';
import uniqid from "uniqid";
import asyncHandler from 'express-async-handler';
import {
    getMovie, getPopularMovies,  getUpcomingMovies, getMovieCredits, getMovieImages, getMovieReviews, getTopRatedMovies,getGenres,
} from '../tmdb-api';

const router = express.Router();
let Regex = /^[1-9][0-9]*$/;

/**,
 * @swagger
 * /api/movies:
 *    get:
 *      tags:
 *       - movie
 *      summary: 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: 
 * */
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

// Get movie reviews
/**,
 * @swagger
 * /api/movies/:id/reviews:
 *    get:
 *      tags:
 *       - movie
 *      summary: movieReviews
 *      operationId: movieReviews 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: "successful operation"
 * */
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
/**,
 * @swagger
 * /api/movies/:id/reviews:
 *    post:
 *      tags:
 *       - movie
 *      summary: movieReviews
 *      operationId: movieReviews 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: "successful operation"
 * */
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
/**
 * @swagger
 * /api/movies/tmdb/popular/page{page}:
 *   get:
 *    tags:
 *     - movie
 *    summary: "Get popular movies"
 *    description: "Get popular movies"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "Movie not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */
router.get('/tmdb/popular/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const popularMovies = await getPopularMovies(page);
    res.status(200).json(popularMovies);
}));

/**
 * @swagger
 * /api/movies/tmdb/upcoming/page{page}:
 *   get:
 *    tags:
 *     - movie
 *    summary: "Get upcoming movies"
 *    description: "Get upcoming movies"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "Movie not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */
router.get('/tmdb/upcoming/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
}));

/**
 * @swagger
 * /api/movies/tmdb/topRated/page{page}:
 *   get:
 *    tags:
 *     - movie
 *    summary: "Get toperate movies"
 *    description: "Get toperate movies"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "Movie not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */
router.get('/tmdb/topRated/:page', asyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const topRatedMovies = await getTopRatedMovies(page);
    res.status(200).json(topRatedMovies);
}));

/**,
 * @swagger
 * /api/movies/tmdb/genres:
 *    get:
 *      tags:
 *       - movie
 *      summary: getGenres
 *      operationId: getGenres 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: "successful operation"
 * */
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

/**
 * @swagger
 * /api/movies/tmdb/{id}:
 *   get:
 *    tags:
 *     - movie
 *    summary: "Get specific movies"
 *    description: "Get specific movies"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "id"
 *       description: "Movie id number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "Movie not found"
 *      500:
 *        description: "Internal server error"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */
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

/**,
 * @swagger
 * /api/movies/tmdb/:id/movie_credits:
 *    get:
 *      tags:
 *       - movie
 *      summary: movieCredits
 *      operationId: movieCredits 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: "successful operation"
 * */
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

/**
 * @swagger
 * /api/movies/tmdb/:id/images:
 *   get:
 *    tags:
 *     - movie
 *    summary: "Get specific movie's images"
 *    description: "Get specific movie's images URL"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "id"
 *       description: "Movie id number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "Movie not found"
 *      500:
 *        description: "Internal server error"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */
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

/**,
 * @swagger
 * /api/movies/tmdb/:id/movieReviews:
 *    get:
 *      tags:
 *       - movie
 *      summary: movieReviews
 *      operationId: movieReviews 
 *      produces:
 *      - application/json
 *      responses:
 *        200:
 *          description: "successful operation"
 * */

router.get('/tmdb/:id/movieReviews', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movieReviews = await getMovieReviews(id);
    res.status(200).json(movieReviews);
}));

export default router;
