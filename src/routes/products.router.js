const express = require("express")
const router = express.Router()

const ProductManager = require("../controller/product.manager.js")
const productManager = new ProductManager()

router.get("/", async (req, res) => {
    try {

        const { limit = 10, page = 1, sort, query } = req.query;
        const products = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        res.json({
            status: 'success',
            payload: products,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
        });

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


router.put("/:id", async (req, res) => {
    const productId = req.params.id
    try {
        await productManager.updateProduct(productId, req.body);
        res.send({ status: "1", message: "Producto modificado con exito" });
    } catch (error) {
        res.send({ status: "0", message: "Error al modificar el producto" });
    }
});

 
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