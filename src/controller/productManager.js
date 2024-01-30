const fs = require('fs').promises


class ProductManager {
    constructor() {
        this.path = "./src/models/products.json"
    }
    // hacemos que el id arranque de 0 y despus me vaya sumando cuando agrego el producto
    static id = 0
    
    async addProduct(newProduct){
        try {
            let products  = await this.readProduct()
            newProduct.id = products.length + 1;
            let productAll = [...products, newProduct]
            await fs.writeFile(this.path,JSON.stringify(productAll))
             console.log("Producto Agregado")
        } catch (error) {
            console.log("No se pudo agregar el producto")
        }
    }

    async getProduct(){
        try {
            let respuesta = await fs.readFile(this.path, "utf-8")
            let respuestaParseda = JSON.parse(respuesta)
            
            if(respuestaParseda.length == 0){
                console.log("No hay productos")
            }
            return respuestaParseda
        } catch (error) {
            console.log("No se pudo leer el producto")
        }
    }


    // busco si existe el id
    async getProductById(id){
        try {
            const arrayProd = await this.readProduct()
            const productoEncontrado = arrayProd.find((prod) => prod.id == id)
            if(productoEncontrado){
                console.log("producto encontrado",productoEncontrado)
                return productoEncontrado
            }else{
                console.log("No existe el producto")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async readProduct(){
        try {
           const respuesta = await fs.readFile(this.path, "utf-8")
           const arrayProd = JSON.parse(respuesta)
           return arrayProd
        } catch (error) {
            console.log("Error al leer el archivo")
        }
    }


    async updateProduct(id, product) {
        try {
            await this.deleteProduct(id);
            let lastProduct = await this.readProduct();
            let productNew = [{ ...product, id }, ...lastProduct];
            await fs.writeFile(this.path, JSON.stringify(productNew, null, 2));
        } catch (error) {
            console.log("Error al modificar el producto");
        }
    }

    async deleteProduct(id){
        try {
            let respuesta = await this.readProduct()
            let product = respuesta.filter(prod => prod.id != id)
            console.log(`Se elimino el producto con el ID: ${id}`)
            await fs.writeFile(this.path,JSON.stringify(product))
        } catch (error) {
            console.log("Error al eliminar el producto")
        }
        
    }
}

module.exports = ProductManager;