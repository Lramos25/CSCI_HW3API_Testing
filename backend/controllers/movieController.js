const asyncHandler = require('express-async-handler')

const Movies = require('../model/movieModel')


// Get movie entry based on title
// GET api/movies
const getMovie = asyncHandler(async (req, res) => {
    const movies = await Movies.find()

    res.status(200.).json(movies)
})

// Set new movie entry
// POST api/movies
const setMovie = asyncHandler(async (req, res) => {

    switch (req) {
        case !req.body.title:
            return res.json({success: false, message: 'title of the movie'});
        case !req.body.releaseYear:
            return res.json({success: false, message: 'release year'});
        case !req.body.genre:
            return res.json({success: false, message: 'genre.'});
        case req.body.actors.length < 3:
            return res.json({success: false, message: '3 actors.'});
        default:
            var movieNew = new Movies();
            movieNew.title = req.body.title;
            movieNew.releaseYear = req.body.releaseYear;
            movieNew.genre = req.body.genre;
            movieNew.actors = req.body.actors;
            movieNew.save(function (err){
                if (err) {
                    if (err.code == 11000)
                        return res.json({success: false, message: 'Movie already exists.'});
                    else
                        return res.json(err);
                }
            });
    }

    res.status(200.).json({Movies, message: 'movie saved'})
})


// Update movie YYYY based on title
// PUT api/movies/:id
const updateMovie = asyncHandler(async (req, res) => {

    //const movie = await Movies.findById(req.params.title)

    const movie = await Movies.find({"movie.title": req.params.id})
    console.log(movie)
    if (!movie){
        res.status(400)
        throw new Error('Movie not found')
    }

    const updatedMovie = await Movies.findByIdAndUpdate(req.params.id, req.body.releaseYear)

    res.status(200.).json({updatedMovie, message: `Update ${req.params.id}`})
})


// Delete movie entry based on title
// DELETE api/movies/:id
const deleteMovie = asyncHandler(async (req, res) => {

    const movie = await Movies.findOneAndDelete({"movie.id": req.params.id})
    //console.log(movie)
    if (!movie){
        res.status(400)
        throw new Error('Movie not found')
    }

    //await movie.findOneAndDelete()

    res.status(200.).json({movie, id: req.params.id})
})


module.exports = {
    getMovie,
    setMovie,
    updateMovie,
    deleteMovie
}