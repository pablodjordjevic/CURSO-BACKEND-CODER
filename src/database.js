const mongoose = require("mongoose")

// conexion bs
mongoose.connect("mongodb+srv://ecommerce:coderhouse@cluster0.e5buzzc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {console.log("Conexion exitosa")})
.catch((error) =>console.log("Error en al conexion",error))