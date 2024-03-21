const fs = require ('fs');

class productManager {
    #products
    #path

    constructor (){
        this.#products = [];
        this.#path = './data/products.json';
        this.readProductsInFile();
    }

/* Adding products */

    addProduct(title, description, price, image, code, stock) {
        if (!title || !description || !price || !image || !code || !stock)
            return 'All data are required (title, description, price, image, code, stock)'
        const codeRepeat = this.#products.some(p => p.code == code) 
            if (codeRepeat) {
        return `The code ${code} is already busy, please try again`
    }
        productManager.idProduct = productManager.idProduct +1
        const id = this.assignId();
        const newProduct = {
            id,
            title,
            description,
            price,
            image,
            code,
            stock
        };

        this.#products.push(newProduct)
        this.saveFile()

        return'Product added successfully'
    }

/* Getting products */

    getProducts(){
        return this.#products
    }

/* Getting products by id  */

    getProductsById(id){
        const product = this.#products.find(p => p.id == id)
        return product ? product: 'Not found';
    }

    /* Automatic auto-incrementing id */

    assignId() {
        let id = 1;
            if(this.#products.length !==0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;
    }

/* Reading products */

    readProductsInFile() {
        try {
            if(fs.existsSync(this.#path))
                this.#products = JSON.parse(fs.readFileSync(this.#path, 'utf-8'));    
                console.log('Reading file succesfully');
            return [];
        }
        catch (error) {
            console.log(`Error reading file, ${error}`);
        }
    }

/* Saving files*/

    saveFile() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        }
        catch (error) {
            console.log(`Error saving file, ${error}`);
        }
    }

/* Updating products */

updateProduct(id, updateProd) {

    let alert = `The product with id ${id} doesnt exist`;

    const index = this.#products.findIndex(p => p.id === id);
    if (index !== -1) {
        const {id: prodId, ...rest} = updateProd;
        this.#products[index] = {...this.#products[index], ...rest};
        this.saveFile();
        alert = 'Product updated';
    }
    return alert
}

/* Deleting products */

eraseProduct(id) {

    let alert = `The product with id ${id} doesnt exist`;

    const index = this.#products.findIndex(p => p.id === id);
    if (index !== -1) {
        this.#products.splice(index, 1);
        this.saveFile();
        alert = 'Product deleted';
    }
        return alert;
    }
}

module.exports = productManager