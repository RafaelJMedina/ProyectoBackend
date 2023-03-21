class ProductManager {
    constructor(){
        this.productos = []
    }

    getProducts(){
        return this.productos;
    }
    addProduct(title, description, price, thumbnail, code, stock){
        let id_producto = (this.getProducts()).length;

        let producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: ++id_producto
        }

        if (!producto.title||
        !producto.description||
            !producto.price||
            !producto.thumbnail||
            !producto.code||
            !producto.stock||
            !producto.id
        ){
            return 'Los campos son obligatorios'
        }

        let codigo = this.productos.find((prod) => prod.code == producto.code)
        
        if(codigo){
            return 'Codigo de Producto Repetido, ingre un nuevo codigo de producto'
        } else {
            this.productos.push(producto)
            return this.productos;
        }
    }

    getProductsById(id_producto){
        let producto = this.productos.find(producto => producto.id == id_producto)

        if (producto) {
            return producto
        } else {
            return 'No hay producto o codigo de producto repetido!'
        }
    }
}

const productosnuevos = new ProductManager()

productosnuevos.addProduct('Computadora','Tecnologia',200,'Sin imagen','C001',10,1) // CASO 1

productosnuevos.addProduct('Celular','Tecnologia',100,'Sin imagen','T001',20,2) // CASO 2

productosnuevos.addProduct('Computadora','Tecnologia',200,'Sin imagen','C001',10,3) // CASO 3 'SE REPITE EL CODIGO DE PRODUCTO'


console.log(productosnuevos.getProductsById(1))

console.log(productosnuevos.getProductsById(2))

console.log(productosnuevos.getProductsById(3))


