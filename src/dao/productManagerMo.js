//import fs from "fs";

import { productsModel } from "./models/productsModel.js";

class productManagerMo {

  /* Adding products */

  async addProduct({
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      images = [],
      category  // tambien pasar en el body de la request como array
  }) {
    let newProduct = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      images,
      category
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