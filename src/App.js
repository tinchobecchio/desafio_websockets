import express from 'express'
import { Server } from 'socket.io'

import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import realTimeRouters from './routes/realTimeProducts.routes.js'
import { engine } from 'express-handlebars'
import { __dirname, __filename } from './path.js'
import * as path from 'path'

// Configuration express

const app = express()
const port = 4000

// Configuration handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const myServer = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// server Io. muy importante que este antes de las rutas porque sino el io aparece como undefined
const io = new Server(myServer, { cors: { origin: '*' }}) // para problemas con el cors
app.use((req, res, next) => { // esto es para poder usar el io en todas las rutas. lo voy a llamar con req.io
  req.io = io
  return next()
})

//Configuration routes

app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouters)
app.use('/api/carts', cartsRouters)
app.use('/api/realtimeproducts', realTimeRouters) // esta es la ruta que usa los sockets
