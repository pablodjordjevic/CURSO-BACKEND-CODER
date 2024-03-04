const express = require("express")
const router = express.Router()
const CartManager = require("../controller/cart.manager.js")
const cartManager = new CartManager()



router.post("/", async (req, res) => {
    try {
        const carts = await cartManager.crearCarrito();
        res.json({ status: "1", message: "Carrito agregado con éxito", carts });
    } catch (error) {
        res.status(500).json({ status: "0", message: "Error al agregar el Carrito" });
    }
});


router.get("/:id", async (req,res) =>{
    let id = req.params.id
    try {
        let carrito = await cartManager.getCartById(id)
        res.json(carrito.products);
    } catch (error) {
        console.log("No existe el carrito con ese id", error)
        res.status.json({messege: "Error del servidor"})
    }
})

router.post("/:cid/product/:pid", async (req,res) =>{
    const cid = req.params.cid
    const pid = req.params.pid
    const quantity = req.body.quantity || 1
    try {
        let respuesta = await cartManager.agregarProductoCart(cid,pid,quantity)
        res.send(respuesta)
    } catch (error) {
        console.log("No existe el carrito con ese id", error)
        res.status.json({messege: "Error del servidor"})
    }
    
})

module.exports = router