import { cartsModel } from "./models/cartsModel.js";
import productManager from "./productManagerMo.js";

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

    async removeProductFromCart(cartId, productId) {
        try {
            let cart = await cartsModel.findById(cartId);
            if (!cart) {
                throw new Error(`Cart ${cartId} not found`);
            }
            
            const productIndex = cart.products.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
                await cart.save();
                return cart;
            } else {
                throw new Error(`Product ${productId} not found in cart ${cartId}`);
            }
        } catch (error) {
            throw new Error(`Error removing product from cart: ${error.message}`);
        }
    }

    async eraseCart(cartId) {
        return await cartsModel.deleteOne({ _id: cartId });
    }
}

export default cartsManagerMo;