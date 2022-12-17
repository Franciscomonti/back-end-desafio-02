
const fsPromises = require("fs/promises");

class ProductManager{
    constructor(fileName){
        this.fileName = fileName;
        this.products = this.readFile()
    }

    readFile(){
            fsPromises.readFile(this.fileName)
            .then((data)=> JSON.parse(data))
            .then((data)=> console.log(data))
            .catch((err)=> console.log(err))
    }
}


const productManager = new ProductManager('products.json')

productManager.readFile()

