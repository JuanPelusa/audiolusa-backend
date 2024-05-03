import { Router } from 'express';
<<<<<<< HEAD
import productManager from '../dao/productManagerFs.js';
=======
import productManager from '../dao/productManager.js';
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26

const router = Router();
const p = new productManager('./src/data/products.json');

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