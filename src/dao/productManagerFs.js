import fs from "fs";

class ProductManagerFs {
  #products;
  #path;
  constructor(fileRoute) {
    this.#products = [];
    this.#path = fileRoute;
    console.log("Accesing constructor")
    this.readProductsInFile();
  }

  /* Adding products */

  async addProduct(title, description, code, price, status = true, stock, images = [], category) {
    try {
      if (!title || !description || !code || !price || !status || !stock || !images || !category)
        return "All data are required (title, description, code, price, status, stock, image, category)";

      const codeRepeat = this.#products.some(p => p.code === code);
      if (codeRepeat) {
        return `The code ${code} is already busy, please try again`;
      }

      let id = this.assignId();

      const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        images,
        category,
      };

      this.#products.push(newProduct);
      await this.saveFile();

      return {
        msg: "Product added successfully",
        product: newProduct,
      };
    } catch (error) {
      console.log(`Error adding product: ${error}`);
      return "An error occurred while adding the product";
    }
  }

  /* Getting products */

  async getProducts(limit = 0) {
    limit = Number(limit);
    if (limit && limit > 0) return this.#products.slice(0, limit);
    return this.#products;
  }

  /* Getting products by id  */

  async getProductsById(id) {
    let products = await this.getProducts();
    console.log(products);
    let product = this.#products.find(p => p.id === id);
    return product ? product : false;
  }

  /* Automatic auto-incrementing id */

  assignId() {
    let id = 1;
    if (this.#products.length !== 0) id = this.#products[this.#products.length - 1].id + 1;
    return id;
  }

  /* Reading products */

  async readProductsInFile() {
    try {
      if (fs.existsSync(this.#path))
        this.#products = JSON.parse(await fs.promises.readFile(this.#path, "utf-8"));
      console.log("Reading file successfully");
    } catch (error) {
      console.log(`Error reading file, ${error}`);
    }
  }

  /* Saving files*/

  async saveFile() {
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
    } catch (error) {
      console.log(`Error saving file, ${error}`);
    }
  }

  /* Updating products */

  async updateProduct(id, updateProd) {
    try {
      let alert = `The product with id ${id} doesn't exist`;

      const index = this.#products.findIndex(p => p.id === id);
      if (index !== -1) {
        const { id: prodId, ...rest } = updateProd;
        this.#products[index] = { ...this.#products[index], ...rest };
        await this.saveFile();
        alert = "Product updated";
      }
      return alert;
    } catch (error) {
      console.log(`Error updating product: ${error}`);
      return "An error occurred while updating the product";
    }
  }

  /* Deleting products */

  async eraseProduct(id) {
    try {
      let alert = `The product with id ${id} doesn't exist`;

      const index = this.#products.findIndex(p => p.id === id);
      if (index !== -1) {
        this.#products.splice(index, 1);
        await this.saveFile();
        alert = "Product deleted";
      }
      return alert;
    } catch (error) {
      console.log(`Error deleting product: ${error}`);
      return "An error occurred while deleting the product";
    }
  }
}

export default ProductManagerFs;