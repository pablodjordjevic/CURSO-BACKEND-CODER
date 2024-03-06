const express = require("express")
const router = express.Router()

const ProductManager = require("../controller/product.manager.js")
const productManager = new ProductManager()

const CartManager = require("../controller/cart.manager.js")
const cartManager = new CartManager()

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

router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
 
    try {
       const carrito = await cartManager.getCartById(cartId);
 
       if (!carrito) {
          console.log("No existe ese carrito con el id");
          return res.status(404).json({ error: "Carrito no encontrado" });
       }
 
       const productosEnCarrito = carrito.products.map(item => ({
          product: item.product.toObject(), // lo convertimos en obj
          quantity: item.quantity
       }));

       console.log("productos en carrito",productosEnCarrito)
 
       res.render("cart", { productos: productosEnCarrito });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({error: "Error en el servidor"});
    }
 });


module.exports = router