import { Router } from 'express';
import productManager from '../class/productManager.js';

const router = Router();
const p = new productManager();

/* Get all products */

router.get('/', async (req, res) => {

    let limit = req.query.limit;

    try {
        let products = await p.getProducts(limit);
        res.status(200).json({ products });
        console.log('Response Limit:', { products, limit });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }   
});

/* Get product by id */

router.get('/:pid', async (req, res) => {

    let { pid } = req.params;

    if (isNaN(pid)) {
        return res.status(400).send({error: 'ID must be a number'});
    }
    
    try {
        let productById = await p.getProductsById(Number(pid));
        res.status(200).json({ productById });
        console.log('Response ID:', { productById });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.post('/', async (req, res) => {
    try {
        let { title, description, code, price, status, stock, images, category } = req.body;
        let result = await p.addProduct(title, description, code, price, status, stock, images, category);
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await p.updateProduct(Number(pid), req.body);
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const result = await p.eraseProduct(Number(pid));
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});


export default router;