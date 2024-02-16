import {promises as fs} from "fs"

export default class ProductManager {
    constructor() {
        this.path = "./productos.txt"
        this.products = []

    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        };

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.path, "utf-8")
        return JSON.parse(respuesta)

    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)) {
            console.log("not found");

        } else {
            console.log(respuesta3.find((product) => product.id === id));

        }

    };

    deleteProductById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id);
        await fs.writeFile(this.path, JSON.stringify(productFilter, null, 2));

    };


    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductById(id);
        let productViejo = await this.readProducts();
        let productModificado = [{ id, ...producto }, ...productViejo];
        await fs.writeFile(this.path, JSON.stringify(productModificado,null,2));
    };

}

//const productos = new ProductManager();

/*
productos.addProduct("producto prueba1", "este es un producto prueba1", 200, "img", "abc120", 25);
productos.addProduct("producto prueba2", "este es un producto prueba2", 400, "img", "abc121", 50);
productos.addProduct("producto prueba3", "este es un producto prueba3", 400, "img", "abc122", 50);
productos.addProduct("producto prueba4", "este es un producto prueba4", 400, "img", "abc123", 50);
productos.addProduct("producto prueba5", "este es un producto prueba5", 400, "img", "abc124", 50);
productos.addProduct("producto prueba6", "este es un producto prueba6", 400, "img", "abc125", 50);
productos.addProduct("producto prueba7", "este es un producto prueba7", 400, "img", "abc126", 50);
productos.addProduct("producto prueba8", "este es un producto prueba8", 400, "img", "abc127", 50);
productos.addProduct("producto prueba9", "este es un producto prueba9", 400, "img", "abc128", 50);
productos.addProduct("producto prueba10", "este es un producto prueba10", 400, "img", "abc129", 50);


//productos.getProducts ()

//productos.getProductById (3);

//productos.deleteProductById(1)

/*productos.updateProducts({
    title: "prueba 3",
    description: "prod 3",
    price: 6000,
    img: "img",
    code: "abc 345",
    stock: 16,
    id: 3
}) 

*/