import { Router } from 'express';
import ProductManagerMo from '../dao/ProductManagerMo.js';

const router = Router();
const productManager = new ProductManagerMo();

router.get('/', async (req, res) => {
    try {
        let { limit, sort, page, ...filters } = req.query;
        let paginationInfo = await productManager.getProducts(limit, page, sort, filters);

        if (paginationInfo && paginationInfo.products) {
            res.status(200).render('home', paginationInfo);
        } else {
            res.status(404).send('No products were found');
        }
    } catch (error) {
        console.error('Error trying to get products:', error);
        res.status(500).send('An error has occurred');
    }   
});

router.get('/products', async (req, res) => {
    try {
        let { limit, sort, page, ...filters } = req.query;
        let paginationInfo = await productManager.getProducts(limit, page, sort, filters);

        if (paginationInfo && paginationInfo.products) {
            res.status(200).render('products', paginationInfo);
        } else {
            res.status(404).send('No products were found');
        }
    } catch (error) {
        console.error('Error trying to get products:', error);
        res.status(500).send('An error has occurred');
    }   
});


router.get('/realTime', async (req, res) => {
    try {
        let products = await productManager.getProductsInTime();
        return res.status(200).render('realTime', { products });
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error has occurred');
    }
});

router.get('/chat', (req, res) => {
    res.status(200).render("chat");
  });

export default router;