const ProductModel = require("../models/producto.model.js")


class ProductManager {
    async addProduct({title, description, price, img, code, stock, category, thumbnails}){
        try {

            if(!title || !description || !price || !img || !code || !stock || !category || !thumbnails){
                console.log("Completar todos los campos")
                return
            }

            const productoExistente = await ProductModel.findOne({code: code})
            if(productoExistente){
                console.log(`El producto con codigo ya existe`)
                return
            }

            const nuevoProducto = new ProductModel({
                title,
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            })

            await nuevoProducto.save()
        } catch (error) {
            console.log("Error al agregar un productos", error)
        }
    }

    async getProducts(){
        try {
            const productos = await ProductModel.find()
            return productos
        } catch (error) {
            console.log("Error al agregar ver los productos", error)
        }
    }
    async getProductsById(id){
        try {
            const producto = await ProductModel.findById(id)
            if(!producto){
                console.log("producto no encontrado")
                return null
            }
            console.log("producto encontrado")
            return producto
        } catch (error) {
            console.log("Error al recuperar un producto por ID", error)
        }
    }
    async updateProduct(id, productoActualizado){
        try {
            const producto = await ProductModel.findByIdAndUpdate(id, productoActualizado)
            if(!producto){
                console.log("Producto no actualizado")
                return null
            }
            console.log("Producto actualizado")

            return producto
        } catch (error) {
            console.log("Error al actualizar producto", error)
            
        }
    }

    async deleteProduct(id){

        try {
            await ProductModel.findByIdAndDelete(id)
            if(!producto){
                console.log("No existe el producto con el id indicado")
                return null
            }
            console.log("Producto eliminado")
        } catch (error) {
            console.log("Error al eliminar el producto", error)
        }

    }
}

module.exports = ProductManager