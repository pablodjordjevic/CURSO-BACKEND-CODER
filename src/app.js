const express = require("express")
const PUERTO = 8080
const app = express();
const productRouter = require("./routes/products.router.js")
const cartRouter = require("./routes/carts.router.js")
const viewsRouter = require("./routes/views.router.js")
const userRouter = require("./routes/user.router.js")
const exphbs = require("express-handlebars"); 
const MongoStore = require("connect-mongo");
const session = require("express-session");
require("./database.js")

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("./public"))
app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://ecommerce:coderhouse@cluster0.e5buzzc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
    })
}))

// handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views"); 

// rutas
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/users",userRouter)
app.use("/",viewsRouter)

app.listen(PUERTO, () =>{
    console.log(`el puerto es ${PUERTO}`)
})
