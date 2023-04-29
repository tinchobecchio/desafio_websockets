import { Router } from 'express'
import { ProductManager } from '../productManager.js'

const realTimeRouters = Router()

const myProductManager = new ProductManager('./products.txt')

realTimeRouters.get('/', async (req, res) => {
  const products = await myProductManager.getProducts() // traigo los productos por primera vez
  
  req.io.on('connection', (socket) => { // establezco conexion
    console.log('client connected') // chequeo por consola que esta conectado el socket
    req.io.emit("listado", products) // le mando el listado de productos por primera vez.
    // este emit lo tengo que escuchar en el cliente y renderizar los productos

    socket.on('newProduc', (product) => { // cada vez que recibe un producto nuevo:
      products.push(product) // pushea el producto nuevo en el array que tenia
      req.io.emit("listado", products) // manda un emit con los productos actualizados.
    })

    socket.on('eliminarProd', codigo => {
      // desarrollar la logica para eliminar el prod con el code que me pasan del producto

      // Con este le mandas el listado actualizado y deberia ya escucharlo el cliente y mostrarlo
      // req.io.emit("listado", products)
    }) 
    
  })

  res.render('realTimeProducts') // esto elige la plantilla pero los productos hay que mandarselos por socket
})

export default realTimeRouters
