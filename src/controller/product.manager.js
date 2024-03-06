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

    async getProducts({limit = 10, page = 1, sort , query} = {}){
        try {
            const skip = (page - 1) * limit;

            const queryOptions = {};
            if(query){
                queryOptions = {category: query};
            }

            const sortOptions = {};
            if(sort){
                if(sort == 'asc' || sort == 'desc'){
                    sortOptions.price = sort == 'asc' ? 1 : -1;
                }
            }
            const products = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);
            
            const totalProducts = await ProductModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null
            };

        } catch(error){
            console.log("Error al obtener los productos", error);

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