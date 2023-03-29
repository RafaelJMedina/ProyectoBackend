import fs from 'fs';

const path = './Files/Productos.json'

export default class ProductManager {

    consultarProductos = async () =>{
        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8')
            const productos = JSON.parse(data);
            return productos;
        }else{
            return [];
        }
    }

    addProduct = async (producto) =>{

        const productos = await this.consultarProductos();

        if (productos.length === 0) {
            producto.id = 1
        }else {
            producto.id = productos[productos.length-1].id+1;
        }
        productos.push(producto);

        await fs.promises.writeFile(path, JSON.stringify(productos,null, '\t'))
        return producto
    }

    getProducts = async() =>{
        return this.productos;
    }
    
    getProductsById = async(id) =>{

        let productos = await this.consultarProductos();

        try {
            const producto = productos.find(id => producto.id === id);
            return producto ? producto : null;
        }catch(err) {
            console.log(`error: ${err}`)
        }

        await fs.promises.writeFile(path, JSON.stringify(productos,null, '\t'))
        return productos           
    }
    
    deletProductById = async(id) =>{
        let productos = await this.consultarProductos();

        try {
            productos = productos.filter(productos => productos.id != id);
            await fs.promises.writeFile(path, JSON.stringify(productos,null, '\t'))
        }catch(err){
            console.log(`error: ${err}`)
        }
        
    }

    /*
    upDateProduct = async()=> {
        let productos = await this.consultarProductos();
        let updateById = this.productos.find(productos => productos.id === id);
        updateById.id = '4';
        if (updateById){
            return updateById;
        } else {
            return console.log('No existe producto con ese ID')
        }
    }*/
}
