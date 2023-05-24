const router = require('express').Router()
const { login, isSignedIn, isAuthenticated, getUserData, getUserById, register } = require('../controllers/auth')

router.param('userId',getUserById)

// Uses jwt to authenticate
router.post('/login',login)
router.post('/register',register)

// Uses middlewares isSignedIn and isAuthenticated
router.get('/userData/:userId',isSignedIn,isAuthenticated,getUserData)

module.exports = router