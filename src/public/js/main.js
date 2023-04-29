const socket = io()

// Agregar nuevo producto
const formProduct = document.getElementById('formNewProduc') // formulario para nuevo producto

formProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  const productIterator = new FormData(e.target)
  const product = Object.fromEntries(productIterator)

  socket.emit('newProduc', { product }) //envia el producto nuevo. esto lo escucha el server y me manda el listado actualizado
})

// Listado de productos
const listado = document.getElementById('listado') // traigo el div donde voy a renderizar los productos
socket.on('listado', products => { // escucha cuando el servidor le manda un listado de productos y los muestra

  let prods = '' // Los va a meter en el div como innerHTML asi que los tengo que mandar como string
  products.forEach(producto => { // recorre el array de productos que recibe del socket
    prods +=  // por cada producto se lo agrego a la variable prods con el formato que quiero que tenga
    `<div class=' d-flex flex-wrap col-md-3 mx-2 my-3 r' >                                 
        <div class="card w-100 mt-5 border border-dark" >
          <div class="card-header text-white bg-dark">
              ${producto.title}
          </div> 
          <div class="card-body">
              <img src= ${producto.thumbnail} alt= "Products img" class='card-img' >
              
              <br />
              Price:  €  ${producto.price}  
              <br />
              Stock : ${producto.stock}
          </div>                                                                                   
        </div>
    </div>`
    listado.innerHTML = prods // le paso los productos formateados al div y los muestra
  })
})

// Faltaria hacer un form que pasandole el code elimine el producto.
// manda un emit con el code, el server lo escucha, modifica el listado de products
// y le manda al cliente un emit "listado" con el listado actualizado
// Aca con el socket.on("listado") los deberia mostrar automaticamente