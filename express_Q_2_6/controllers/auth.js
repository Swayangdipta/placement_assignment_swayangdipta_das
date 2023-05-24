const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {expressjwt} = require('express-jwt')

exports.getUserById = (req,res,next,id) => {
    try {
        User.findById(id).then(user => {
            if(!user){
                return res.status(404).json({error: "No user found!"})
            }

            req.profile = user
            next()
        }).catch(error => {
            return res.status(400).json({error: "Faild to load user details!"})
        })        
    } catch (error) {
        return res.status(500).json({error: "Something went wrong!"})
    }
}

exports.login = (req,res) => {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({error: "All fields are required!"})
    }

    try {
        User.findOne({email}).then(user => {
            if(!user.authenticate(password)){
                return res.status(401).json({error: "Password did not matched!"})
            }

            let token = jwt.sign({_id:user._id},process.env.SECRET)
            res.cookie("token",token,{expiry: new Date(Date.now()+2.592e+9)})

            return res.status(200).json({
                token,
                user
            })
        }).catch(err => {
            return res.status(400).json({error: err})
        })        
    } catch (error) {
        return res.status(400).json({error: error})
    }

}

exports.register = (req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({error: "All fields are required!"})
    }

    let user = new User(req.body)

    try {
        user.save().then(data => {
            return res.status(200).json({success: "User signed up!"})
        }).catch(err => {
            return res.status(400).json({error: err})
        })
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

exports.getUserData = (req,res) => {
    req.profile.encryptedPassword = undefined
    req.profile.salt = undefined
    return res.status(200).json(req.profile)
}


// Middlewares
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    algorithms: ["SHA256","SHA512","HS256","RS256","sha1",'RSA'],
    userProperty: "auth"
})

exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id

    if(!checker){
        return res.status(401).json({error: "You are not authorized!!"})
    }

    next()
}