import express from 'express'
import ProductManager from "./Manager/ProductManager.js";


const PORT = 8080;
const app = express();
const productos = new ProductManager('./Files/Productos.json');
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, ()=>{
    console.log('Servidor funciona en el puerto: '+ PORT)
})

app.get('/products', async (req,res)=>{
    const productos = await productManager.consultarProductos();
    const limit = req.query.limit;
    if(!limit){
        res.send({productos});
    } else {
        let resultadosFilter = productos.slice(0, limit);
        res.send(resultadosFilter);
    }
});

app.get('/products/:id', async (req,res)=>{
    
    const id = req.params.id;
    const products = await productManager.consultarProductos();

    const productoId = products.find(product => product.id == id);

    if (productoId) {
        res.send(productoId);
    } else {
        res.send(`No se encotro ningún producto con el id ${id}`)
    }

})  