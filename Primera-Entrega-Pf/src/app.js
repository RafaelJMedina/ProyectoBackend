import express  from 'express';
import carritosRouter from './routes/carrito.router.js'
import productosRouter from "./routes/product.router.js";

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log('Servidor funcionando en el puerto: ' + PORT)
})

app.use('/api/products', productosRouter);
app.use('/api/carts', carritosRouter);
