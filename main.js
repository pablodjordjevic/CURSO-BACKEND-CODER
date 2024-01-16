import {promises as fs} from "fs"

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./product.txt"
    }
    // hacemos que el id arranque de 0 y despus me vaya sumando cuando agrego el producto
    static id = 0

    async addProduct(title, descrption, price, image, code, stock ){  

        // validamos si completamos todos los datos
        if(!title || !descrption || !price || !image || !code || !stock){
            console.log("Completar todos los campos")
            return;
        }

        // some() funciona igual que find nada mas que some te devuelve un boolean
        if(this.products.some(produc=> produc.code == code)){
            console.log("El codigo debe ser unico")
            return;
        }
        ProductManager.id++
        let newProduct = {
            title, 
            descrption, 
            price, 
            image, 
            code, 
            stock, 
            id:ProductManager.id
        };

        this.products.push(newProduct)
        await fs.writeFile(this.path,JSON.stringify(this.products))
    }
        
    // retorno productos
    async getProduct(){
        try {
            let respuesta = await fs.readFile(this.path, "utf-8")
            console.log(JSON.parse(respuesta))
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
                console.log(productoEncontrado)
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
           console.log(arrayProd)
           return arrayProd
        } catch (error) {
            console.log("Error al leer el archivo")
        }
    }

    async guardarArchivo(arrayProd){
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProd,null,2))
        } catch (error) {
            console.log("Error al guardar el archivo")
        }
    }

    async updateProduct({id, ...product}){
        try {
            await this.deleteProduct(id)
            let lastProduct = await this.readProduct()
            let productNew = [{...product, id}, ...lastProduct]
            console.log("nuevo producto",productNew)
            await fs.writeFile(this.path, JSON.stringify(productNew,null,2))
        } catch (error) {
            console.log("Error al modificar el producto")
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

const manager = new ProductManager()

// manager.getProduct()
// manager.getProductById(1)
// manager.deleteProduct(1)
manager.updateProduct({
    title: 'Product 3',
    descrption: 'Product #3333',
    price: 333,
    image: 'imagen',
    code: 'code3',
    stock: 3,
    id: 3
  })
// manager.addProduct('Product 1', 'Product #1', 111, 'imagen', "code1", 1)
// manager.addProduct('Product 2', 'Product #2', 222, 'imagen', "code2", 2)
// manager.addProduct('Product 3', 'Product #3', 333, 'imagen', "code3", 3)
// manager.addProduct('Product 4', 'Product #4', 444, 'imagen', "code4", 4)
// manager.addProduct('Product 5','Product #4', 555, 'imagen', "code5", 5)


