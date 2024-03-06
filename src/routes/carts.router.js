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

// dea aca en adelante probar bien
router.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
        await cartManager.eliminarProductoCart(cid, pid);
        res.json({ message: "Producto eliminado del carrito con éxito" });
    } catch (error) {
        console.log("Error al eliminar el producto del carrito", error);
        res.status(500).json({ message: "Error del servidor al eliminar el producto del carrito" });
    }
});


router.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        await cartManager.actualizarCantidadProductoCart(cid, pid, quantity);
        res.json({ message: "Cantidad de producto actualizada con éxito" });
    } catch (error) {
        console.log("Error al actualizar la cantidad del producto en el carrito", error);
        res.status(500).json({ message: "Error del servidor al actualizar la cantidad del producto en el carrito" });
    }
});


router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;

    try {
        await cartManager.vaciarCarrito(cid);
        res.json({ message: "Carrito vaciado con éxito" });
    } catch (error) {
        console.log("Error al vaciar el carrito", error);
        res.status(500).json({ message: "Error del servidor al vaciar el carrito" });
    }
});



module.exports = router