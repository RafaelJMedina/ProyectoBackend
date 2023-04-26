import { Router } from "express";
import ProductManager from "../Manager/ProductManager.js";


const router = Router();
const manager = new ProductManager();

router.get('/', async (req,res)=>{
    const productos = await manager.consultarProductos();
    const limit = req.query.limit;
    if(!limit){
        res.send({productos});
    } else {
        let resultadosFilter = productos.slice(0, limit);
        res.send(resultadosFilter);
    }
});

router.get('/:pid', async (req,res)=>{
    
    const id = req.params.pid;
    const products = await manager.consultarProductos();

    const productoId = products.find(product => product.id == id);

    if (productoId) {
        res.send(productoId);
    } else {
        res.send(`No se encotro ningún producto con el id ${id}`)
    }

});

router.post ('/', async (req, res) => {

    const productoNuevo = req.body; 
    const productoAgregado = await manager.addProduct(productoNuevo)
    if (productoAgregado) {
        /* Si todo va bien, enviar respuesta al cliente con res.send() */
        res.status(201).json(productoAgregado);
      }
      else{
        /* Si ocurre un error, enviar una respuesta de error al cliente con res.status() y res.send() */
        res.status(500).send('Error al agregar el producto: ' + error.message);
      };   
})

router.put('/:pid', async (req, res)=>{
    const pid = req.params.pid;
    const p = req.body.p;
    const productoActualizado = await manager.updateProduct(pid, p)
    if(productoActualizado) {
      res.json(productoActualizado);
    }
    else{
      res.status(500).send('Error al actualizar el producto: ' + error.message);
    };
})

router.delete ('/:pid', async (req, res)=> {
    const pid = parseInt(req.params.pid)
    res.send({status: 'Success',message: await manager.deletProductById(pid)})
})

export default router;