const express = require("express")
const router = express.Router()
const Product = require("../controller/productManager.js")
const producto = new Product()

let products = []


router.post("/addProduct", async (req,res) =>{
    const newProduct = req.body;
    try {
        await producto.addProduct(newProduct);
        res.send({status:"1", message: "Producto agregado con exito"})
    } catch (error) {
        res.send({status:"0", message: "Error al agregar el producto"})
    }
})

router.get("/", async (req,res) =>{
    let limit = parseInt(req.query.limit)
    let todosProducts = await producto.readProduct();
    let productLimit = todosProducts.slice(0,limit)
    limit ? res.send(productLimit) : res.send(todosProducts)
    products = await producto.getProduct()
})

router.put("/productModif/:id", async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        await producto.updateProduct(productId, req.body);
        res.send({ status: "1", message: "Producto modificado con exito" });
    } catch (error) {
        res.send({ status: "0", message: "Error al modificar el producto" });
    }
});

 

router.get("/:id", (req,res)=>{
    let id = req.params.id
    let productoId = products.find(prod => prod.id == id)

    productoId ? res.send(productoId) : res.send(`No existe el producto con el ID: ${id}`)
})

module.exports = router