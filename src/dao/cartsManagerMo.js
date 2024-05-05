import { cartsModel } from "./models/cartsModel.js";

class cartsManagerMo {

    /* Creating carts */

    async createCart() {
        return await cartsModel.create({ products: [] })
    }

    /* Getting carts */

    async getCarts() {
        const carts = await cartsModel.find();
        return carts;
    }

    /* Getting carts by id */

    async getCartById(id) {
        const cartId = await cartsModel.findOne({ _id: id });
        return cartId;
    }

    /* Adding products to existing carts */

    async addProductToCart(cid, pid) {
        try {
            let cartId = await this.getCartById(cid);
            let quantity = cartId.products.some((p) => p.id == pid);

        if (quantity) {
            let productInCart = cartId.products.find((p) => p.id == pid);
            productInCart.quantity = productInCart.quantity + 1;
        } else {
            cartId.products.push({ id: pid, quantity: 1 });
        }
      
        await cartId.save();
        } catch (error) {
            console.error(error);
        }
    } 
    async eraseProduct(productId) {
        return await productsModel.deleteOne({ _id: productId });
    }
}

export default cartsManagerMo;