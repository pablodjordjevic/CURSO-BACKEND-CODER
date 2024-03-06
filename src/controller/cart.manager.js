
const CartModel = require("../models/cart.model.js")

class CartManager {
    async crearCarrito(){
        try {
            const nuevoCarrito = new CartModel({products: []})
            await nuevoCarrito.save();
            return nuevoCarrito
        } catch (error) {
            console.log("Error al crear el carrito",error)
            res.status(500).json({messege: "Hubo un error en el servidor"})
        }
    }

    async getCartById(id){
        console.log("entre aca")
        try {
            const carrito = await CartModel.findById(id)

            if(!carrito){
                console.log(`No hay carrito con el id: ${id}`)
                return null
            }
            console.log("carrito", carrito)
            return carrito
        } catch (error) {
            console.log("Error al obtener el carrito",error)
            res.status(500).json({messege: "Hubo un error en el servidor"})
        }
    }

    async agregarProductoCart(id,productId,quantity = 1){
        try {
            const carrito = await CartModel.findById(id)
            const existeProducto = carrito.products.find(item => item.product.toString() == productId)
            if(existeProducto){
                existeProducto.quantity += quantity
            }else{
                carrito.products.push({product: productId, quantity})
            }
            carrito.markModified("products")
            await carrito.save()
            return carrito
        } catch (error) {
            console.log("Error al agregar el producto",error)
            res.status(500).json({messege: "Hubo un error en el servidor"})
        }
    }


    // de aca en adelante probar bien
    async eliminarProductoCart(idCarrito, idProducto) {
        try {
            const carrito = await CartModel.findById(idCarrito);
    
            if (!carrito) {
                console.log(`No hay carrito con el id: ${id}`)

                return null
            }
    
            carrito.products = carrito.products.filter(item => item.product.toString() != idProducto);
            await carrito.save();
        } catch (error) {
            console.log("Error al eliminar el producto del carrito", error);
            res.status(500).json({messege: "Hubo un error en el servidor"})
        }
    }

    async actualizarCantidadProductoCart(idCarrito, idProducto, cantidad) {
        try {
            const carrito = await CartModel.findById(idCarrito);
    
            if (!carrito) {
                console.log(`No hay carrito con el id: ${id}`)
            }
    
            const productoEnCarrito = carrito.products.find(item => item.product.toString() == idProducto);
    
            if (productoEnCarrito) {
                productoEnCarrito.quantity = cantidad;
                await carrito.save();
            } else {
                throw new Error("El producto no existe en el carrito");
            }
        } catch (error) {
            console.log("Error al eliminar el producto del carrito", error);
            res.status(500).json({messege: "Hubo un error en el servidor"})
        }
    }
    

    async vaciarCarrito(idCarrito) {
        try {
            const carrito = await CartModel.findById(idCarrito);
    
            if (!carrito) {
                console.log(`No hay carrito con el id: ${id}`)

            }
            carrito.products = [];
            await carrito.save();
        } catch (error) {
            console.log("Error al eliminar el producto del carrito", error);
            res.status(500).json({messege: "Hubo un error en el servidor"})
        }
    }
    
    
}


module.exports = CartManager