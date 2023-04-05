import express from 'express'
import ProductManager from "./Manager/ProductManager.js";

const PORT = 8080;

const productos = new ProductManager('./Files/Productos.json');
const productManager = new ProductManager();

const app = express();

app.listen(PORT, ()=>{
    console.log('Servidor funciona en el puerto: '+ PORT)
})

app.get('/', async (req,res)=>{
    const productos = await productManager.consultarProductos();
    res.send(productos)
})

app.get('/producto/:id', async (req,res)=>{
    
    const id = req.params.id;
    const producto = await productManager.getProductById(id);
    res.send(producto)

})  
 