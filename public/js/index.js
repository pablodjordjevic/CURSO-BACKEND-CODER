const socket = io()

socket.on("productos", (data) =>{
    renderProducts(data)
})


const renderProducts = (productos) =>{
    const productsContainer = document.getElementById('productsContainer')

    console.log(productos)

    productsContainer.innerHTML = productos.map(prod => `

        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <a href="#">
                <img class="p-8 rounded-t-lg object-cover h-80 w-full" src="${prod.img}" alt="product image" />
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">${prod.title}</h5>
                    <h6 class="text-xl font-semibold tracking-tight text-gray-900 ">${prod.description}</h6>
                </a>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 ">$${prod.price}</span>
                    <button onclick="deleteProductos(${prod.id})" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Borrar Producto</a>
                </div>
            </div>
        </div>
    `).join('');
}

const deleteProductos = (id) =>{
    socket.emit("eliminarProducto", id)
}

const agregarProducto = () =>{
    const title = document.getElementById('title').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const img = document.getElementById('img').value
    const codigo = document.getElementById('codigo').value
    const stock = document.getElementById('stock').value

    const products = {
        title: title,
        description: description,
        price: price,
        img: img,
        codigo: codigo,
        stock: stock
    }

    if (title == '' || description == '' || price == '' || img == '' || codigo == '' || stock == '' ) {
        console.log("Completa todo")
        return;
    }
    
    console.log("productos",products)
    socket.emit("agregarProducto", products)
}