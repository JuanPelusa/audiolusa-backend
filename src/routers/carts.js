import { Router } from 'express';
import cartsManager from '../class/cartsManager.js';

const router = Router();
const c = new cartsManager();

/* Get a cart by ID */

router.get('/:cid', async (req, res) => {
    try {
        let { cid } = req.params;
        let cart = await c.getCartById(Number(cid));
        if (cart === 'Not found') {
            res.status(404).json({ error: 'Cart not found' });
        } else {
            res.json({ cart });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});

/* Create a new cart */

router.post('/', async (req, res) => {
    try {
        let newCart = await c.createCart();
        res.status(201).json({ cart: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});

/* Add a product to a cart */

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        let { cid, pid } = req.params;
        let updatedCart = await c.addProductToCart(Number(cid), Number(pid));
        res.json({ cart: updatedCart });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});

export default router;