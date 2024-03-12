const express = require("express")
const router = express.Router()

const UserModel = require("../models/user.model.js")

// post para generar usuario y almacenarlo en MB
router.post("/", async (req,res) => {
    const {first_name, last_name, email, password, age} = req.body

    try {
        // verificamos si existe el correo
       const existeUsuario = await UserModel.findOne({email: email})
       if(existeUsuario){
        return res.status(400).send({error: "el mail ya esta registrado"})
       } 
       
       const nuevoUser = await UserModel.create({
            first_name,
            last_name, 
            email, 
            password, 
            age
    })

    //    almacenamos la info del user en la session
    req.session.login = true;
    req.session.user = {...nuevoUser._doc}

    res.redirect("/profile")

    } catch (error) {
        console.log("Error al crear el usuario", error)
        res.status(500).send({error: "Error al guardar el user"})
    }
})

module.exports = router