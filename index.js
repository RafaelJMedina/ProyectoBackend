import ProductManager from "./Manager/ProductManager.js";

const Manager = new ProductManager();

const env = async ()=>{

    let producto = {
        title: 'Cepillo',
        description: 'Higiene',
        price: '500',
        thumbnail: 'sin imagen',
        code: 'H1',
        stock: '200',
    }

    // 'CONSULTAR PRODUCTO'

    let productos = await Manager.consultarProductos()
    console.log(productos)

    // 'AÑADIENDO PRODUCTO'

    //let result = await Manager.addProduct(producto)
    //console.log(result)

    // 'CONSULTAR POR ID'

    //let productos = await Manager.getProductsById()
    //console.log(productos)

    // 'BORRAR POR ID'

    //let borrar = await Manager.deletProductById(4)
    //console.log(borrar)

    // 'ACTUALIZAR JSON'

    //let actualizar = await Manager.upDateProduct(5)
    //console.log(actualizar)

}
env()
