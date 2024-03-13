class Productmanager {
    #products
    static idProduct = 0
    constructor (){
        this.#products = []
    }
    addProduct(title, description, price, image, code, stock) {
        if (!title || !description || !price || !image || !code || !stock)
        return 'All data are required (title, description, price, image, code, stock)'
     const codeRepeat = this.#products.some(p => p.code == code)
     if (codeRepeat)
        return `The code ${code} is already busy, please try again`
        
        Productmanager.idProduct = Productmanager.idProduct +1
        const id = Productmanager.idProduct
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
        
        return'Product added successfully'
    }
    getProducts(){
        return this.#products
    }
    getProductsById(id){
        const product = this.#products.find(p => p.id == id)
        if (product)
            return product
        else
            return `Not Found`
    }
}



module.exports = Productmanager