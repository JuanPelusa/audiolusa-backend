import express from "express";
import { Server } from 'socket.io';
import { engine } from "express-handlebars";
import products from './routers/products.js';
import carts from './routers/carts.js';
import views from './routers/views.js';
import path from 'path';
import __dirname from './utils.js'
import productManager from "./dao/productManager.js";

const app = express();
const PORT = 3000;

const p = new productManager(path.join(__dirname, "/data/products.json"));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))
 
app.use('/', views);
app.use('/api/products', products);
app.use('/api/carts', carts);



const expressServer= app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});
const socketServer = new Server(expressServer);

socketServer.on('connection', socket => {
    console.log('client connected');
    let products = p.getProducts();
    socket.emit('products', products)
    
})




//<script src="/socket.io/socket.io.js"></script>
  //  <script src="/js/index.js"></script>
