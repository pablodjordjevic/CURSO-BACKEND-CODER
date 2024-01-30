const express = require("express")
const router = express.Router()
const cartManager = require("../controller/cartManager.js")
const cart = new cartManager()



router.post("/", async (req, res) => {
    try {
        const carts = await cart.addCarts();
        res.json({ status: "1", message: "Carrito agregado con éxito", carts });
    } catch (error) {
        res.status(500).json({ status: "0", message: "Error al agregar el Carrito" });
    }
});

router.get("/", async (req, res) => {
    try {
        const todosCarritos = await cart.readCart();
        res.send(todosCarritos)
    } catch (error) {
        res.status(500).json({ error: "Error al leer el carrito" });
    }
});


router.get("/:id", async (req,res) =>{
    try {
        let id = req.params.id
        let respuesta = await cart.getCartById(id)
        res.send(respuesta)
    } catch (error) {
        res.send("Error al retornar el carrito");
    }
})

router.post("/:cid/products/:pid", async (req,res) =>{
    let cid = req.params.cid
    let pid = req.params.pid
    let respuesta = await cart.addProductCart(cid,pid)
    res.send(respuesta)
})

module.exports = router