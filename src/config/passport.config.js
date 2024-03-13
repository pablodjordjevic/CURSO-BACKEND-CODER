const passport = require("passport")
const local = require("passport-local")
const UserModel = require("../models/user.model.js")
const { createHash, passwordValido } = require("../utils/hashbcryptjs")


const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"
    }, async (req, username, password, done) => {
        const {first_name , last_name, email, age} = req.body
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

            return(done, result)
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
                console.log("No existe el user")
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

    passport.serializeUser(async(id, done) => {
        let user = await UserModel.findOne({_id:id})
        done(null, user)
    })
}

module.exports = initializePassport