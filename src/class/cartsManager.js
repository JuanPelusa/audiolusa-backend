import fs from "fs";
import productManager from "./productManager.js";

class cartsManager {
  #carts;
  #path;
  constructor() {
    this.#carts = [];
    this.#path = "./src/data/carts.json";
    this.readCartsFromFile();
    this.p = new productManager();
  }

  /* Creating carts */

  async createCart() {
    try {
      const newCart = {
        id: this.assignId(),
        products: [],
      };
      this.#carts.push(newCart);
      await this.saveCartsToFile();
      return newCart;
    } catch (error) {
      console.log(`Error creating cart: ${error}`);
      return "An error occurred while creating the cart";
    }
  }

  /* Getting carts */

  async getCarts() {
    return this.#carts;
  }

  /* Getting carts by id */

  async getCartById(id) {
    return this.#carts.find(cart => cart.id === id) || "Not found";
  }

  /* Reading carts */

  async readCartsFromFile() {
    try {
      if (fs.existsSync(this.#path)) {
        this.#carts = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
      }
      console.log("Reading carts file successfully");
    } catch (error) {
      console.log(`Error reading carts file: ${error}`);
      return "An error occurred while reading the carts file";
    }
  }

  /* Adding products to existing carts */

  async addProductToCart(cid, pid) {
    try {
      const cart = this.#carts.find(c => c.id === cid);

      const existingProductIndex = cart.products.findIndex(product => product.id === pid);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        const product = await this.p.getProductsById(pid);

        if (!product) {
          return `Product with id ${pid} not found`;
        }
        cart.products.push({ id: pid, quantity: 1 });
      }
      await this.saveCartsToFile();
      return cart;
    } catch (error) {
      console.log(`Error adding product to cart: ${error}`);
      return "An error occurred while adding the product to the cart";
    }
  }

  /* Saving carts */

  async saveCartsToFile() {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
      console.log("Carts saved successfully");
    } catch (error) {
      console.log(`Error saving carts file: ${error}`);
      return "An error occurred while saving the carts file";
    }
  }

  /* Assing id to carts */

  assignId() {
    let id = 1;
    if (this.#carts.length !== 0) {
      id = this.#carts[this.#carts.length - 1].id + 1;
    }
    return id;
  }
}

export default cartsManager;