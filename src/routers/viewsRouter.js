import { Router } from 'express';
import productManager from '../dao/productManager.js';
import path from "path";
import __dirname from "../utils.js";

const router = Router();
const p = new productManager(path.join(__dirname, "/data/products.json"));

router.get('/', async (req, res) => {
    try {
        const products = await p.getProducts();
        return res.status(200).render('home', { products });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await p.getProducts();
        return res.status(200).render('realTime', { products });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

export default router;
