import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = "./Files/Productos.json";
  }

  consultarProductos = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const productos = JSON.parse(data);
      return productos;
    } else {
      return [];
    }
  };

  addProduct = async (producto) => {
    const productos = await this.consultarProductos();

    if (productos.length === 0) {
      producto.id = 1;
    } else {
      producto.id = productos[productos.length - 1].id + 1;
    }
    productos.push(producto);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productos, null, "\t")
    );
    return producto;
  };

  getProducts = async () => {
    return this.productos;
  };

  getProductById = async(id) =>{
    try {
      const productos = await this.consultarProductos();
      const productosFilter = productos.filter((producto) => {
        return producto.id == id
      })
      return productosFilter.length
        ? productosFilter[0]
        : `No existe el producto con id ${id}`;
    }catch(err) {
      return err;
    }  
  }

  deletProductById = async (id) => {
    try {
      let productos = await this.consultarProductos();
      let productosFilter = productos.filter((producto) => producto.id != id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productosFilter, null, "\t")
      );
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  updateProduct = async (id, data) => {
    try {
      let productos = await this.consultarProductos();
      let productosFilter = productos.filter((product) => product.id === id);
      if (productosFilter.length) {
        let productUpdated = Object.assign(productosFilter[0], data);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(productos, null, "\t")
        );
        return productUpdated;
      } else {
        return "No existe producto con id: " + id;
      }
    } catch (error) {
      return error;
    }
  };
}
