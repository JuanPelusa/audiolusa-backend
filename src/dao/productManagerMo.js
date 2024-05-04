//import fs from "fs";

import { productsModel } from "./models/productsModel.js";

class productManagerMo {

  /* Adding products */

  async addProduct(id, title, description, code, price, status = true, stock, images = [], category) {

      if (!id || !title || !description || !code || !price || !status || !stock || !images || !category)
        return "All data are required (title, description, code, price, status, stock, image, category)";

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

      await productsModel.create(newProduct);

  }


  /* Getting products */

  async getProducts(limit){
        return await productsModel.find().limit(limit).lean();
}

  /* Getting products by id  */

  async getProductsBy(filter) {
    return await productsModel.findOne(filter).lean()
};

  /* Updating products */

  async updateProduct(id, updateProd) {
      return await productsModel.findByIdAndUpdate(id, updateProd, {
        runValidators: true,
        returnDocument: "after",
      })
  }

  /* Deleting products */

  async eraseProduct(productId) {
    return await productsModel.deleteOne({ _id: productId });
  }
}

export default productManagerMo;