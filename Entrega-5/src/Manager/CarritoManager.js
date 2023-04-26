import fs from 'fs';
import ProductManager from '../Manager/ProductManager.js';

const productos = new ProductManager();

export default class CarritoManager {
    constructor(path) {
        this.path = "../Files/Carritos.json";
    }

    addProductInCart = async (idCart, idProd)=> {
        const carritos = await this.getCarritos();
        const carritosFiltradros = carritos.find((cart)=> cart.id == idCart)

        let productosInCart = carritosFiltradros.products;
        const productoIndex = productosInCart.findIndex((u)=> u.id == idProd);

        if (productoIndex !== -1) {
            productosInCart[productoIndex].quantity = productosInCart[productoIndex].quantity + 1;
        } else {
            let producto = {
                id: idProd,
                quantity: 1,
            };
            productosInCart.push(producto);
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'))
        return carritosFiltradros;
    }

    getCarritos = async (req, res)=>{
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const carritos = JSON.parse(data)
            return carritos;
        } else {
            return [];
        }
    };

    getCarrito = async (idCart)=> {
        const carritos = await this.getCarritos();
        const carrito = carritos.find((cart) => cart.id == id.cart)

        return carrito;
    }

    addCarrito = async (req, res) => {
        const carritos = await this.getCarritos();
        const id = carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1;
    
        const newCart = {
            id: id,
            products: []
        };
        
        carritos.push(newCart);
    
        await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, '\t'));
    
        res.status(201).send(newCart);
    }

}