const express = require('express');

const moviesController = require('./../controllers/moviesController')

const router = express.Router();

router.param('id', moviesController.checkId);

router.route('/').get(moviesController.getAllMovies).post(moviesController.validateBody,moviesController.createMovies);

router.route('/:id').get(moviesController.getMoviesById).patch(moviesController.getUpdateMovieById).delete(moviesController.getDeleteMovieById)


module.exports = router;