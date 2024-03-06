const express = require("express")
const PUERTO = 8080
const app = express();
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const exphbs = require("express-handlebars"); 
require("./database.js")

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

app.listen(PUERTO, () =>{
    console.log(`el puerto es ${PUERTO}`)
})
