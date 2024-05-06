import express from "express";
import productsRouter from './routers/productsRouter.js';
import cartsRouter from './routers/cartsRouter.js';
import { engine } from "express-handlebars";
import path from 'path';
import __dirname from './utils.js';
import viewsRouter from './routers/viewsRouter.js';
import { Server } from 'socket.io';
import mongoose from "mongoose";
import { messagesModel } from "./dao/models/messagesModel.js";

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
    console.log(`Running on port ${PORT}`);
});

let users = [];

export const io =  new Server(server)

io.on('connection', socket => {
    console.log(`Connection success`);
    socket.on("id", async name => {
    users.push({id:socket.id, name})
    socket.broadcast.emit('newUser', name)
      let messages = await messagesModel.find();
      socket.emit("previousMessages", messages);
      socket.broadcast.emit("newUser", name);
    });
    socket.on("newMessage", async (userName, message) => {
      await messagesModel.create({ user: userName, message: message });
      io.emit("sendMessage", userName, message);
    });
    socket.on("disconnect", () => {
        let user = users.find(u => u.id === socket.id)
        if(user){
            io.emit("userOut", user.name)
        }
    })
  });

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