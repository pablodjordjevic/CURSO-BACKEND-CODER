const express = require("express")
const router = express.Router()


const ProductManager = require("../controller/productManager.js")
const productManager = new ProductManager ("../models/products.js")

router.get("/", async (req, res) =>{
    try {
        const productos = await productManager.getProduct()
        res.render("home", {productos: productos})
    } catch (error) {
        console.log("Error al ver los productos")
        res.status(500).json({error: "Error del servidor"})
    }
})

router.get("/realtimeproducts",  async(req,res) =>{
    try {
        res.render("realtimeproducts")
    } catch (error) {
        console.log("Error en la vista")
        res.status(500).json({error: "Error del servidor"})
    }
})


module.exports = router