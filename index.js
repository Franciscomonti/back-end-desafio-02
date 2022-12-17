const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = this.readFile();
    }

    readFile() {
        const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
        return data;
    }

    writeData(data) {
        let dataString = JSON.stringify(data);
        fs.writeFileSync(`./${this.path}`, dataString);
        return dataString;
    }

    idGenerator() {
        if (this.products.length > 0) {
            let productsId = this.products.map((product) => product.id);
            return Math.max(...productsId) + 1;
        } 

        let id = 1;
        return id;
    }

    getAllProducts() {
        let data = this.readFile();
        console.log(data);
        return data;
    }

    addProduct(product) {

        if (this.products.find((item) => item.code === product.code)) {
            return console.log("Product code already exists");
        } else if (
            !!!product.title ||
            !!!product.price ||
            !!!product.code ||
            !!!product.description ||
            !!!product.thumbnail ||
            !!!product.stock
        ) {
            return console.log("some date is null");
        } 
        
        let data = this.readFile();   
        product.id = this.idGenerator();
        data.push(product);
        this.writeData(data);
        
    }

    getProductById(id) {
        let data = this.readFile();
        let productToGet = data.find((product) => product.id === id);
        if (productToGet) {
            console.log(productToGet);
            return productToGet;
        }

        console.log("The id of the product to get is not found");
    }

    updateProduct(id, product) {
        let data = this.readFile();
        if (data.find((product) => product.id === id)) {
            let productDeleted = data.filter((product) => product.id !== id);
            product.id = id;
            productDeleted.push(product);
            this.writeData(productDeleted);
            return productDeleted;
        }

        console.log("The id of the product to update is not found");
    }

    deleteProduct(id) {
        let data = this.readFile();
        if (data.find((product) => product.id === id)) {
            let products = data.filter((product) => product.id !== id);
            this.writeData(products);
            console.log(products);
            return products;
        }

        console.log("The id of the product to delete is not found");
    }
}

const productManager = new ProductManager("products.json");

//Testing

let product1 = {
    title: "Pencil",
    description: "Black pencil",
    price: 150,
    code: "dsada",
    thumbnail: "url://images",
    stock: 10,
};

//-----Add new product --------
// productManager.addProduct(product1);


//-----Get product by id--------
// productManager.getProductById(3);


//-----Delete product by id --------
//productManager.deleteProduct(3);


//-----Update exist product --------
// productManager.updateProduct(2, {
//      title: "tshirt",
//      description: "Black tshirt",
//      price: 300,
//      code: "asdas",
//      thumbnail: "url://images",
//     stock: 10
//  });