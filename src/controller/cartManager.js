const fs = require('fs').promises
const productManager = require("./productManager.js")

const products = new productManager

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
        this.carts = []
    }

    async readCart(){
        try {
           const respuesta = await fs.readFile(this.path, "utf-8")
           const carts = JSON.parse(respuesta)
           return carts
        } catch (error) {
            console.log("Error al leer el archivo")
        }
    }

    async existCart(id){
        const arrayCart = await this.readCart();
        const cartEncontrado = arrayCart.find((prod) => prod.id == id);
        if (cartEncontrado) {
            console.log("producto encontrado", cartEncontrado);
            return cartEncontrado;
        } else {
            return `No se encontro el carrito con el ID:${id} `
        }
    }

    async getCartById(id) {
        try {
            const cart = await this.existCart(id);
            return cart
        } catch (error) {
            console.log(error);
        }
    }
    
    async addCarts() {
        try {
            let carts = await this.readCart();
            let maxId = Math.max(...carts.map(cart => cart.id),0);

            let cartsProduc = [...carts,{ id: maxId +1, products: [] }];
            await fs.writeFile(this.path, JSON.stringify(cartsProduc));

            console.log("Carrito Agregado");
            
            return cartsProduc;
        } catch (error) {
            console.log("No se pudo agregar el carrito");
        }
    }

    async addProductCart(cid, pid) {
        try {
            const cartId = await this.existCart(cid);
            const productId = await products.getProductById(pid);
            let allCarts = await this.readCart();
    
            if (!productId) {
                return console.log("Producto no encontrado");
            }
    
            let updatedCart = allCarts.map(cart => {
                if (cart.id == cartId.id) {
                    const existingProduct = cart.products.find(prod => prod.id == productId.id);
                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    } else {
                        cart.products.push({ id: productId.id, quantity: 1 });
                    }
                }
                return cart;
            });
    
            await fs.writeFile(this.path, JSON.stringify(updatedCart));
            return "Producto agregado al carrito";
        } catch (error) {
            console.log("Error al agregar producto al carrito");
            return "Error al agregar producto al carrito";
        }
    }
    
}


module.exports = CartManager;