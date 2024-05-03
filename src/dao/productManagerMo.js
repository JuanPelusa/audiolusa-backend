//import fs from "fs";

import { productsModel } from "./models/productsModel.js";

class productManagerMo {

  /* Adding products */

  async addProduct(id, title, description, code, price, status = true, stock, images = [], category) {
    try {
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

  async getProducts(limit){
    try{
        return await productsModel.find().limit(limit).lean();
    }
    catch(error){
        console.log(error,"Error desde getProducts");
    }
    
}

  /* Getting products by id  */

  async getProductsBy(filter) {
    return await productsModel.findOne(filter).lean()
};

  /* Updating products */

  async updateProduct(id, updateProd) {
    let alert = `The product with id ${id} doesn't exist`;
    try {
      return await productsModel.findByIdAndUpdate(id, updateProd, {
        runValidators: true,
        returnDocument: "after",
      })
      return alert;
    } catch (error) {
      console.log(`Error updating product: ${error}`);
      return "An error occurred while updating the product";
    }
    
  }

  /* Deleting products */

  async eraseProduct(productId) {
    return await productsModel.deleteOne({ _id: productId });
  }
}

export default productManagerMo;