import fs from 'fs';

class cartManager {
    #carts;
    #path;
    constructor() {
        this.#carts = [];
        this.#path = './src/data/cartProducts.json';
        this.readCartProductsInFile();
    }


    async buildCart(){
        let newCart = {
            id: this.assignIdToCart(),
            products: []
        };
        this.#carts.push(newCart);
            await this.saveFile();

            return {
                msg: 'Cart created successfully',
                cart: newCart
            };
    }

    /* Getting carts by id  */

    getCartsById(id) {
        const product = this.#carts.find(p => p.id == id)
            if(product)
                return product;
            else
                return `Not found`;
    }

    /* Automatic auto-incrementing cart id */

    assignIdToCart() {
        let id = 1;
        if (this.#carts.length !== 0)
            id = this.#carts[this.#carts.length - 1].id + 1;
        return id;
    }

    /* Reading cart products */

    async readCartProductsInFile() {
        try {
            if (fs.existsSync(this.#path))
                this.#carts = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'));
            console.log('Reading file successfully');
        } catch (error) {
            console.log(`Error reading file, ${error}`);
        }
    }

    /* Saving cart files*/

    async saveFile() {
        try {
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
        } catch (error) {
            console.log(`Error saving file, ${error}`);
        }
    }
}

export default cartManager;