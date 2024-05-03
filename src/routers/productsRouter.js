import { Router } from 'express';
import productManager from '../dao/productManagerMo.js';
import { io } from '../app.js';
import { isValidObjectId } from 'mongoose';

const router = Router();
const p = new productManager;

/* Get all products */

router.get('/', async (req, res) => {

    let limit = req.query.limit;

    try {
        let products = await p.getProducts(limit);
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
        let productById = await p.getProductsBy({ _id: pid});
        res.status(200).json({ productById });
        console.log('Response ID:', productById);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.post('/', async (req, res) => {


    try {
        let { id, title, description, code, price, status, stock, images, category } = req.body;
        let result = await p.addProduct(id, title, description, code, price, status, stock, images, category);
        io.emit('New product', result);
        res.status(200).json({ result });
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

    try {
        let result = await p.updateProduct(pid);
        res.json({ result });
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
        let product = await p.eraseProduct(pid);
        if (product.deletedCount > 0) {
            let erased = await p.getProducts();
            io.emit("eraseProducts", erased);
            return res.json({ payload: `Product ${pid} deleted` });
          } else {
            return res.status(404).json({ error: `Product ${id} doesnt exist` });
          }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
    
});


export default router;