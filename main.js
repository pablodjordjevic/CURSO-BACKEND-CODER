

class ProductManager {
    constructor() {
        this.products = [];
    }
    // hacemos que el id arranque de 0 y despus me vaya sumando cuando agrego el producto
    static id = 0

    addProduct(title, descrption, price, image, code, stock ){  

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
        this.products.push({
            title, 
            descrption, 
            price, 
            image, 
            code, 
            stock, 
            id:ProductManager.id
        });
    }

    // retorno productos
    getProduct(){
        return this.products;
    }

    // busco si existe el id
    getProductById(id){
        if(this.products.find((prod) => prod.id == id)){
            console.log("Existe")
        }else{
            console.log("Not Found")
        }
    }
}

const manager = new ProductManager()


console.log(manager.getProduct())


manager.addProduct('Product 1', 'Product #1', 111, 'imagen', "code1", 1)
manager.addProduct('Product 2', 'Product #2', 222, 'imagen', "code2", 2)
manager.addProduct('Product 3', 'Product #3', 333, 'imagen', "code3", 3)
manager.addProduct('Product 4', 'Product #4', 444, 'imagen', "code4", 4)
manager.addProduct('Product 5','Product #4', 555, 'imagen', "code5", 5)

console.log(manager.getProduct())
console.log(manager.getProductById(4))