const express = require("express")
const router = express.Router()
const UserModel = require("../models/user.model.js")
const passport = require("passport")


// router.post("/login", async(req, res) => {
//     const {email, password} = req.body
//     console.log("query",req.body)
//     try {
//         console.log("entre al try")
//         const usuario = await UserModel.findOne({email: email})
//         console.log("usuario login",usuario)

//         // buscamos el usuario
//         if(passwordValido(password, usuario)){
//             if(usuario.password === password) {
//                 req.session.login = true
//                 req.session.user = {...usuario._doc}
//                 res.redirect("/profile")
//             } else {
//                 res.status(401).send({error: "Contraseña no valida"})
//             }
//         }
//     } catch (error) {
//         console.log("error del servidor",error)
//         res.status(400).send({error: "error en el login"})
//     }
// })

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/failLogin"}), async(req,res) =>{
    if(!req.user) return res.status(400).send({status: "error"})
    req.session.user = {
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age : req.user.age,
        email : req.user.email,
    }
    req.session.login = true

    res.redirect("/profile")
})

router.get("/failLogin", (req,res) =>{
    res.send({error: "Error de login"})
})

router.post("/logout", (req, res) => {
    console.log("entre a logout",req.session)

    if(req.session.login){
        req.session.destroy()
    }
    res.redirect("/login")
})

router.get("/github", passport.authenticate("github", {
    scope: ["user:email"]
}) , async (req,res) => {})

router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async (req,res) =>{
    req.session.user = req.user
    req.session.login = true
    res.redirect("/profile")
})

module.exports = router