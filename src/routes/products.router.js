const express = require("express")
const router = express.Router()

const ProductManager = require("../controller/product.manager.js")
const productManager = new ProductManager()



router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        const todosProducts = await productManager.getProducts();
        
        if (!isNaN(limit) && limit > 0) {
            const productLimit = todosProducts.slice(0, limit);
            res.json(productLimit);
        } else {
            res.json(todosProducts);
        }
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});


router.post("/", async (req,res) =>{
    const newProduct = req.body;
    try {
        await productManager.addProduct(newProduct);
        res.send({status:"1", message: "Producto agregado con exito"})
    } catch (error) {
        res.send({status:"0", message: "Error al agregar el producto"})
    }
})



router.put("/productModif/:id", async (req, res) => {
    const productId = req.params.id
    try {
        await productManager.updateProduct(productId, req.body);
        res.send({ status: "1", message: "Producto modificado con exito" });
    } catch (error) {
        res.send({ status: "0", message: "Error al modificar el producto" });
    }
});

 

router.get("/:id", async (req,res)=>{
    let id = req.params.id
    const productoId = await productManager.getProductsById(id)

    productoId ? res.send(productoId) : res.send(`No existe el producto con el ID: ${id}`)
})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    
    try {
        await productManager.deleteProduct(id)
        res.send(`producto eliminado con id: ${id}`)
        console.log("Producto eliminado")
    } catch (error) {
        console.log("Error al eliminar el producto",error)
        res.status(500).json({message: "Error del servidor"})
    }
})

module.exports = router