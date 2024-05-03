import express from "express";
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';
import { engine } from "express-handlebars";
import path from 'path';
import __dirname from './utils.js';
import viewsRouter from './routers/viewsRouter.js';
import { Server } from 'socket.io';
<<<<<<< HEAD
import mongoose from "mongoose";
=======
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26

const app = express();
const PORT = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', viewsRouter);

app.get('/', (req, res) => {
    return res.status(200).render('home');
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});

export const io =  new Server(server)

io.on('connection', socket => {
    console.log(`Connection success`)
})

<<<<<<< HEAD
io.emit('New product'. products)

const connectionToDB = async() => {
    try {
        await mongoose.connect(
            "mongodb+srv://JuanPelusa:Sakura86@cluster0.ifijpoq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        dbName: "products"
    })
    console.log("Database online")

    } catch (error) {
        console.log("Error in database", error.message)
    }
}

connectionToDB()
=======
io.emit('New product'. products)
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26
