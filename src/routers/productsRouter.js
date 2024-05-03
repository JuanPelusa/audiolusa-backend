import { Router } from 'express';
<<<<<<< HEAD
import productManager from '../dao/productManagerMo.js';
import { io } from '../app.js';
import { isValidObjectId } from 'mongoose';

const router = Router();
const p = new productManager;
=======
import productManager from '../dao/productManager.js';
import { io } from '../app.js';
import path from "path";
import __dirname from "../utils.js";

const router = Router();
const p = new productManager(path.join(__dirname, "/data/products.json"));
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26

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

<<<<<<< HEAD
    if (!isValidObjectId(pid)) {
        return res.status(400).json({
          error: `Invalid Id`,
        });
      }

    try {
        let productById = await p.getProductsBy({ _id: pid});
        res.status(200).json({ productById });
        console.log('Response ID:', productById);
=======
    if (isNaN(pid)) {
        return res.status(400).send({error: 'ID must be a number'});
    }
    
    try {
        let productById = await p.getProductsById(Number(pid));
        res.status(200).json({ productById });
        console.log('Response ID:', { productById });
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.post('/', async (req, res) => {
<<<<<<< HEAD


    try {
        let { id, title, description, code, price, status, stock, images, category } = req.body;
        let result = await p.addProduct(id, title, description, code, price, status, stock, images, category);
=======
    try {
        let { title, description, code, price, status, stock, images, category } = req.body;
        let result = await p.addProduct(title, description, code, price, status, stock, images, category);
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26
        io.emit('New product', result);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
<<<<<<< HEAD
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
=======
    
    
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await p.updateProduct(Number(pid), req.body);
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.delete('/:pid', async (req, res) => {
<<<<<<< HEAD
    
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
=======
    try {
        const { pid } = req.params;
        let result = await p.eraseProduct(Number(pid));
        
        res.json({ result });
        io.emit('Product deleted', pid)
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
    
});


export default router;