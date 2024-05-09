import { productsModel } from "./models/productsModel.js";
class ProductManagerMo {

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
      category 
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

  /* Getting products by real time */

  async getProductsInTime(){
    return await productsModel.find().lean();
}

async getProducts(limit = 6, page = 1, price, query) {
  let options = {
      limit,
      page,
      lean: true,
      sort: price ? { price } : undefined,
  };

  let filter = query;

  try {
      let { docs: payload, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = await productsModel.paginate(filter, options);

      return {
          status: "success",
          products: payload,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink: hasPrevPage ? `/?page=${prevPage}` : null,
          nextLink: hasNextPage ? `/?page=${nextPage}` : null,
      };
  } catch (error) {
      return {
          message: error.message,
      };
  }
}

  /* Getting products with paginate */

  async getProducts(limit = 6, page = 1, price, query) {
    let options = {
        limit,
        page,
        lean: true,
        sort: price ? { price } : undefined,
    };

    let filter = query;

    try {
        let { docs: payload, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = await productsModel.paginate(filter, options);

        return {
            status: "success",
            products: payload,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/?page=${prevPage}` : null,
            nextLink: hasNextPage ? `/?page=${nextPage}` : null,
        };
    } catch (error) {
        return {
            message: error.message,
        };
    }
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

  async eraseProduct(pid) {
    return await productsModel.deleteOne({ _id: pid });
  }
}

export default ProductManagerMo;