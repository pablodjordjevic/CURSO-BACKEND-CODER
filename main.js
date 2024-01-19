import express from 'express';
import {promises as fs} from "fs"

class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./product.txt"
    }
    // hacemos que el id arranque de 0 y despus me vaya sumando cuando agrego el producto
    static id = 0

    async addProduct(title, description, price, image, code, stock ){  

        // validamos si completamos todos los datos
        if(!title || !description || !price || !image || !code || !stock){
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
            description, 
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
                console.log("producto encontrado",productoEncontrado)
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
const productos = await manager.readProduct();
const PUERTO = 8080
const app = express();

app.get('/', async (req, res) =>{
    res.send("Bienvenidos")
    await manager.addProduct('Product 1', 'Product #1', 111, 'imagen', "code1", 1);
    await manager.addProduct('Product 2', 'Product #2', 222, 'imagen', "code2", 2);
    await manager.addProduct('Product 3', 'Product #3', 333, 'imagen', "code3", 3);
    await manager.addProduct('Product 4', 'Product #4', 444, 'imagen', "code4", 4);
    await manager.addProduct('Product 5','Product #5', 555, 'imagen', "code5", 5);
    await manager.addProduct('Product 6','Product #6', 666, 'imagen', "code6", 6);
    await manager.addProduct('Product 7','Product #7', 777, 'imagen', "code7", 7);
    await manager.addProduct('Product 8','Product #8', 888, 'imagen', "code8", 8);
    await manager.addProduct('Product 9','Product #9', 999, 'imagen', "code9", 9);
    await manager.addProduct('Product 10','Product #10', 1010, 'imagen', "code10", 10);
})

app.get('/products' , async (req,res) =>{
    let limit = parseInt(req.query.limit)
    let todosProducts = await manager.readProduct();
    let productLimit = todosProducts.slice(0,limit)

    limit ? res.send(productLimit) : res.send(todosProducts)

})

app.get('/products/:id', (req,res)=>{
    let id = req.params.id
    let productoId = productos.find(prod => prod.id == id)

    productoId ? res.send(productoId) : res.send(`No existe el producto con el ID: ${id}`)
})

app.listen(PUERTO, () =>{
    console.log(`el puerto es ${PUERTO}`)
})