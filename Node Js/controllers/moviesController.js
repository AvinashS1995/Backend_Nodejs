const fs = require("fs");
let movies = JSON.parse(fs.readFileSync("./data/movies.json"));

//PARAM MIDDLEWARE FUNCTION
exports.checkId = (req, res, next, value) => {
    const movie = movies.find((mId => mId.id === parseInt(value)));
    if (!movie) {
       return res.status(404).json({
            status: "fail",
            message: `Movie with ID ${value} is Not Found`
        })
    }
    next()
}

//MIDDLEWARE TO CHECK REQUEST BODY
exports.validateBody = (req, res, next) => {
  const requiredFields = ['name', 'year', 'duration'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  console.log("validate Body")

    if(missingFields.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: `Bad Request Body: Missing Parameter ${missingFields.join(', ')}`
      })
    }
    next()
}

 exports.getAllMovies = (req, res) => {
    res.status(200).json({
      status: "Success",
      message: req.message,
      data: {
        movies: movies,
      },
    });
  }
  
  exports.createMovies = (req, res) => {
    console.log(req.body);
  
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ id: newId }, req.body);
  
    movies.push(newMovie);
  
    fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
      if (err) {
        console.log("Data Post Error");
      } else {
        res.status(201).json({
          status: "Success",
          data: {
            movies: newMovie,
          },
        });
      }
    });
  
    // res.send("Created")
  }
  
  exports.getMoviesById = (req, res) => {
    console.log(req.params);
    // res.send(req.params);
  
    const id = parseInt(req.params.id);
  
    let movie = movies.find((mId) => mId.id === id);
  
    // if (!movie) {
    //   res.status(404).json({
    //     status: "fail",
    //     message: "Movie with ID " + id + " is not found",
    //   });
    // } else {
      res.status(200).json({
        status: "Success",
        data: {
          movie: movie,
        },
      });
    // }
  }
  
  exports.getUpdateMovieById =(req, res) => {
    // console.log(req.param)
  
    let id = req.params.id * 1;
    let moviesToUpdate = movies.find((mId) => mId.id === id);
  
    // if (moviesToUpdate) {
      const index = movies.indexOf(moviesToUpdate);
  
      Object.assign(moviesToUpdate, req.body);
  
      movies[index] = moviesToUpdate;
  
      fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
        if (err) {
          console.log("Something went wrong while writing file");
          return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: "Success",
            data: {
              movie: moviesToUpdate,
            },
          });
        }
      });
    // } 
    // else {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "No Movie Object with ID " + id + " is found",
    //   });
    // }
  }
  
  exports.getDeleteMovieById = (req, res) => {
    const id = req.params.id * 1;
    const moviesToDelete = movies.find((mId) => mId.id === id);
  
    // if (moviesToDelete) {
      const index = movies.indexOf(moviesToDelete);
  
      movies.splice(index, 1);
  
      fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
        if (err) {
          console.log("Something went wrong while writing file");
          return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: "Success",
            data: {
              movie: null,
            },
          });
        }
      });
    // } 
    // else {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "No Movie Object with ID " + id + " is found",
    //   });
    // }
  }