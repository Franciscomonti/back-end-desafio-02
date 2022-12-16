const fs = require('fs');

class ProductManager{
    constructor(pathFile){
        this.path = pathFile;
        this.products = this.readFile();
    }

    readFile(){
        const data = JSON.parse(fs.readFileSync(`./${this.path}`, 'utf-8'))
        return data;
    }

    writeData(data){
        let dataString = JSON.stringify(data);
        fs.writeFileSync(`./${this.path}`, dataString);
        return dataString;
    }

    idGenerator(){
        if(this.products.length > 0){
            let id = this.products.map(product => product.id)
            return Math.max(...id) + 1
        }else{
            let id = 1
            return id
        }
    }
    
    getAllProducts(){
        let data = this.readFile();
        console.log(data);
        return data;
    }

    addProduct(product){
        if(this.products.find(item => item.code ===  product.code)){
            return console.log("Product code already exists");
        }

        else if(product.title == null || product.price == null || product.code == null || product.description == null || product.thumbnail == null || product.stock == null){
            return console.log("some date is null");
        }

        else{
            let data = this.readFile();
            product.id = this.idGenerator();
            data.push(product);
            this.writeData(data);
        }
    }

    getProductById(id) {

        let data = this.readFile();
        if(data.find(product => product.id === id)){
            let productToGet = data.find(product => product.id === id)
            console.log(productToGet)
            return productToGet;
        }else{
            console.log("The id of the product to get is not found")
        }
    }

    updateProduct(id, product){
        let data = this.readFile();
        if(data.find(product => product.id === id)){
            let productDeleted = data.filter(product => product.id !== id)
            product.id = id;
            productDeleted.push(product);
            this.writeData(productDeleted);
            return productDeleted;
        }else{
            console.log("The id of the product to update is not found")
        }
    }

    deleteProduct(id){
        let data = this.readFile();
        if(data.find(product => product.id === id)){
            let products = data.filter(product => product.id !== id)
            this.writeData(products);
            console.log(products)
            return products;
        }else{
            console.log("The id of the product to delete is not found")
        }
    }


}


const productManager = new ProductManager('products.json')

let product1 = { title:'Pencil',description: 'Black pencil', price: 150 , code : 'd213123ada', thumbnail: 'url://images', stock : 10 }

productManager.addProduct(product1)

productManager.getProductById(2)

productManager.deleteProduct(1)

productManager.updateProduct(4, { title:'tshirt',description: 'Black tshirt', price:300 , code : 'asdas', thumbnail: 'url://images', stock : 10 })