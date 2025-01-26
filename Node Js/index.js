//Imports
const express = require("express");

const moviesRouter = require('./routes/moviesRoutes');

const app = express();

const morgan = require('morgan');


const logger = function(req, res, next) {
  console.log("Custom Logger Message");
  next()
}

app.use(express.json());
app.use(logger);
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use((req, res, next) => {
  req.message = "Records Successfully Fetched"
  next();
})


//GET REQUEST
// app.get("/api/v1/movies", getAllMovies);

//POST REQUEST
// app.post("/api/v1/movies", createMovies);

//GET REQUEST BY ID
// app.get("/api/v1/movies/:id", getMoviesById);

//PATCH REQUEST USING ID
// app.patch("/api/v1/movies/:id", getUpdateMovieById);

//DELETE REQUEST BY ID
// app.delete("/api/v1/movies/:id", getDeleteMovieById);

//USING ROUTES
app.use('/api/v1/movies', moviesRouter)

module.exports = app;
