const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/usersModel')


// Create user
// POST api/users
const registerUser = asyncHandler(async (req, res) => {

    const {name, username, password } = req.body

    if (!name || !username || !password) {
        res.status(400)
        throw new Error('Please include all data')
    }

    const userExists = await User.findOne({username})

    if (userExists) {
        res.status(400)
        throw new Error('User with username already exists')
    }

    //hashing PW
    const salt = await bcrypt.genSalt(10)
    const hashedPW = await bcrypt.hash(password, salt)

    //user creation
    const user = await User.create({
        name,
        username,
        password: hashedPW
    })

    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            //token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }

})


// Login user
// POST api/users/login
const loginUser = asyncHandler(async (req, res) => {

    const {username, password} = req.body

    const user = await User.findOne({username})

    if (!user) {
        return res.status(400).json({message: 'no user with that username'})
    } else {

        if (bcrypt.compare(password, user.password)) {
            //return res.status(200).json({ msg: "Login success" })
            res.status(200).json({
                msg: "Login success",
                _id: user.id,
                name: user.name,
                username: user.username,
                //token: generateToken(user.id)
            })
        } else {
            return res.status(401).json({ msg: "Invalid login" })
        }
    } //mondodb crashes each time we login

// None of the below methods would work for comparing passwords
    /*
        if(user){
            const cmp = await bcrypt.compare(password, user.password);
            if (cmp) {
                res.status(200).json({message: "User Logged in"})
            } else {
                res.status(401).json({message: "invalid credintal"})
            }
        }
       /*
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                username: user.username
            })
        } else {
            res.status(400)
            throw new Error('Invalid login')
        }  */


})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '60d'})
}

module.exports = {
    registerUser, loginUser
}