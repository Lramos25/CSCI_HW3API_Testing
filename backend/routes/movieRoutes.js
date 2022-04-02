const express = require('express')
const router = express.Router()
const {getMovie} = require('../controllers/movieController')
const {setMovie} = require('../controllers/movieController')
const {updateMovie} = require('../controllers/movieController')
const {deleteMovie} = require('../controllers/movieController')

router.route('/').get(getMovie).post(setMovie) //combines two route functions that work the same

router.route('/:id').put(updateMovie).delete(deleteMovie)

//router.get('/', getMovie)

//router.post('/', setMovie)

//router.put('/:id', updateMovie)

//router.delete('/:id', deleteMovie)

module.exports = router