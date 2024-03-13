const express = require("express")
const router = express.Router()
const UserModel = require("../models/user.model.js")
const { createHash } = require("../utils/hashbcryptjs")
const passport = require("passport")


// post para generar usuario y almacenarlo en MB
// router.post("/", async (req,res) => {
//     const {first_name, last_name, email, password, age} = req.body

//     try {
//         // verificamos si existe el correo
//        const existeUsuario = await UserModel.findOne({email: email})
//        if(existeUsuario){
//         return res.status(400).send({error: "el mail ya esta registrado"})
//        } 
       
//        const nuevoUser = await UserModel.create({
//             first_name,
//             last_name, 
//             email, 
//             password: createHash(password), 
//             age
//         })

//     //    almacenamos la info del user en la session
//         req.session.login = true;
//         req.session.user = {...nuevoUser._doc}

//         res.redirect("/profile")

//     } catch (error) {
//         console.log("Error al crear el usuario", error)
//         res.status(500).send({error: "Error al guardar el user"})
//     }
// })

router.post("/", passport.authenticate("register", {failureRedirect: "/failRegister"}), async(req,res) => {
    if(!req.user) return res.status(400).send({status: error})

    req.session.user = {
        first_name : req.user.first_name,
        last_name : req.user.last_name,
        age : req.user.age,
        email : req.user.email,
    }
    req.session.login = true

    res.redirect("/profile")
})

router.get("/failRegister", (req,res) => {
    res.send({error: "Error de registro"})
})

module.exports = router