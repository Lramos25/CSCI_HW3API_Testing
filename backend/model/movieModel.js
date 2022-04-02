
const mongoose = require('mongoose')

const MoviesSchema = mongoose.Schema({
    title: { type: String, required: true, index: { unique: true }},
    releaseYear: { type: String, required: true},
    genre: { type: String, required: true},
    actors: {type: Array, required: true}
}, {
    timestamps: true
})




module.exports = mongoose.model('Movies', MoviesSchema);

