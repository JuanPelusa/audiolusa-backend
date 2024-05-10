import { Router } from 'express';
import ProductManager from '../dao/ProductManagerMo.js';
import { io } from '../app.js';
import { isValidObjectId } from 'mongoose';

const router = Router();
const productManager = new ProductManager();

/* Get all products */

router.get('/', async (req, res) => {

    try {
      let { limit, sort, page, ...filters } = req.query;
      let products = await productManager.getProducts(limit, page, sort, filters);
        res.status(200).json({ products });
        console.log('Response products:', { products })
        console.log('Response Limit:', { limit });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }   
});

/* Get product by id */

router.get('/:pid', async (req, res) => {

    let { pid } = req.params;

    if (!isValidObjectId(pid)) {
        return res.status(400).json({
          error: `Invalid Id`,
        });
      }

    try {
        let productById = await productManager.getProductsBy({ _id: pid});
        res.status(200).json({ productById });
        console.log('Response ID:', productById);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.post('/', async (req, res) => {

  let { id, title, description, code, price, status, stock, images, category } = req.body;
  if (!id || !title || !description || !code || !price || !status || !stock || !images || !category)
  return req.json({ error: "All data are required"});

  let codeRepeat = await productManager.getProductsBy({ code });
    if (codeRepeat) {
      return res.status(400).json({
      error: `There is already another product with the code ${code}`,
      });
    }

  try {
    await productManager.addProduct({ ...req.body });
    let newProduct = await productManager.getProducts();
    io.emit('New product', newProduct);
      res.status(200).json({payload: `Product added sucessfully`, newProduct});
    } catch (error) {
      console.log(error);
      res.status(500).send('An error has occurred');
  }
});

router.put('/:pid', async (req, res) => {
    
    let { pid } = req.params;

    if (!isValidObjectId(pid)) {
        return res.status(400).json({
          error: `Invalid Id`,
        });
    }

    let update = req.body;

    try {
        let result = await productManager.updateProduct(pid, update);
        return res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.delete('/:pid', async (req, res) => {
    
    let { pid } = req.params;
    
    if (!isValidObjectId(pid)) {
      return res.status(400).json({
        error: `Invalid id`,
      });
    }
    
    try {
        let product = await productManager.eraseProduct({ _id: pid});
        if (product.deletedCount > 0) {
            let erased = await productManager.getProducts();
            io.emit("eraseProducts", erased);
            return res.json({ payload: `Product ${pid} deleted` });
          } else {
            return res.status(404).json({ error: `Product ${pid} doesnt exist` });
          }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
    
});


export default router;