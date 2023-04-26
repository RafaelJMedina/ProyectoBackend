import express from "express";
import handlerbars from "express-handlebars";
import { Server } from 'socket.io';
 
import __dirname from  './utils.js';
import viewRouter from './routes/views.routes.js';
import ProductManager from "./Manager/ProductManager.js";
import CarritoManager from './Manager/CarritoManager.js';

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname+'/public')); //Sirve para guardar los js para el front

app.engine('handlebars', handlerbars.engine()); //levanta handlerbars
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use('/', viewRouter);
app.use('/realtimeproducts', viewRouter);

const server = app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT)
})

const io = new Server(server);

const logs = [];

io.on('connection', (socket) => {
  console.log('Usuario Conectado');

  socket.on('nuevoProducto', (product) => {
    ProductManager.addProduct(product.title, product.description, product.price);
    io.emit('productos', ProductManager.getProducts());
  });
});