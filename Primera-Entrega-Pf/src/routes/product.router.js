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
    
    const id = req.params.id;
    const products = await manager.consultarProductos();

    const productoId = products.find(product => product.id == id);

    if (productoId) {
        res.send(productoId);
    } else {
        res.send(`No se encotro ningún producto con el id ${id}`)
    }

});

router.post ('/', async (req, res) => {

    let productoNuevo = req.body;
    if (!productoNuevo.tilte || !productoNuevo.id ) {
        return res.status(400).send({
            status: 'error', error:'Valores repetido o incompletos'
        })
    }
    productos.push(productoNuevo);

    res.send({status:'Success',message:'Producto Creado'});
})

router.put('/:pid', async (req, res)=>{
    const pid = req.params.pid;
    const p = req.body.p;
    const product = await manager.updateProduct();

    const productoActualizado = product.find(product => product.id == id);

    if (productoActualizado) {
        res.send(productoActualizado.manager.updateProduct())
    } else {
        res.send(`No se encuentra ningun producto por actualizar`)
    }

})

router.delete ('/:pid', async (req, res)=> {
    const pid = parseInt(req.params.pid)
    res.send({status: 'Success',message: await manager.deletProductById()})
})

export default router;