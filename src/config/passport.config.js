const passport = require("passport")
const local = require("passport-local")
const UserModel = require("../models/user.model.js")
const { createHash, passwordValido } = require("../utils/hashbcrypt.js")
const GitHubStrategy = require("passport-github2")

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, email, password, done) => {
        const {first_name , last_name, age} = req.body
        try {
            const user = await UserModel.findOne({email: email})
            if(user) return done(null, false)

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser)

            return done(null, result)
        } catch (error) {
            console.log("error", error)
            return done(error)
        }
    }))

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            const user = await UserModel.findOne({email})

            if(!user){
                console.log("No existe el usuario")
                return done(null, false)
            }
            if(!passwordValido(password, user)) return done(null, false)
            return done(null, user)
        } catch (error) {
            console.log(error)
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await UserModel.findOne({ _id: id })
            done(null, user)
        } catch (error) {
            done(error)
        }
    })

    // estretegia para github
    passport.use("github", new GitHubStrategy({
        clientID: "Iv1.1f9917ce44dc3a1e",
        clientSecret: "e720937e52fd2e21c4fce47cbc3d95a38805ccee",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refresToken, profile, done) => {
        console.log("perfile user",profile)
        try {
            const user = await UserModel.findOne({email: profile._json.email})

            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    age: "",
                    email: profile._json.email,
                    password: ""
                }
                let result = await UserModel.create(newUser)
                done(null, result)
            }else{
                done(null, user)
            }

        } catch (error) {
            done(error)
        }
    }))
}

module.exports = initializePassport
