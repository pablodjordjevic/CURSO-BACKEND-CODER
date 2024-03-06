const express = require("express")
const router = express.Router()

const ProductManager = require("../controller/product.manager.js")
const productManager = new ProductManager ("../models/producto.model.js")

router.get("/products", async (req, res) => {
    try{
        const {page = 1, limit = 4} = req.query;
        const products = await productManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit)
        });

        const newArray = products.docs.map(product => {
            const {_id, ...rest} = product.toObject();
            return rest;
        });

        res.render("products", {
            products: newArray,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages
         });

    }catch (error){
        console.log("Error", error);
        response.status(500).json({error: "Error en el servidor"});
    }
})


module.exports = router