const express = require("express")
const PUERTO = 8080
const app = express();
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const exphbs = require("express-handlebars"); 
const socket = require("socket.io");

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"))

// handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 

// rutas
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)
app.use("/",viewsRouter)

const httpServer = app.listen(PUERTO, () =>{
    console.log(`el puerto es ${PUERTO}`)
})

const ProductManager = require("./controller/productManager.js");
const productManager = new ProductManager("./models/products.json")

const io = socket(httpServer)

io.on("connection", async (socket)=>{
    console.log("Cliente conectado")
    socket.emit("productos", await productManager.getProduct())

    socket.on("eliminarProducto", async (id) =>{
        await productManager.deleteProduct(id)
        io.sockets.emit("productos", await productManager.getProduct())
    })

    socket.on("agregarProducto", async (products) =>{
        await productManager.addProduct(products)
        io.sockets.emit("productos", await productManager.getProduct())
    })
})