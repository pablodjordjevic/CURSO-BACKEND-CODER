const express = require("express")
const PUERTO = 8080
const app = express();
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// rutas
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)


app.listen(PUERTO, () =>{
    console.log(`el puerto es ${PUERTO}`)
})