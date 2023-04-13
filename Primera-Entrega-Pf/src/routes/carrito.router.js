import { Router } from "express";
import CarritosManager from '../Manager/CarritoManager.js'

const router = Router();
const Manager = new CarritosManager();

router.post('/', async(req, res)=>{
    let carritoNuevo = await Manager.addCarrito();
    res.send({ carritoNuevo })
});

router.get('/:cid', async(req, res)=>{
    const id = parseInt(req.params.cid);

    let carrito = await Manager.getCarrito(id);
    res.send({carrito});
});

router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const idCart = req.params.cid;
        const idProd = req.params.pid;
        const resultado = await Manager.addProductInCart(idCart, idProd);

        res.send(resultado);
    } catch {
        res.status(500).send({error: 'Error de la pagina'})
    }
});

export default router;