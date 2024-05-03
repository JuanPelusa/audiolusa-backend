import { Router } from 'express';
<<<<<<< HEAD
import cartsManagerFs from '../dao/cartsManagerFs.js';
=======
import cartsManager from '../dao/cartsManager.js';
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26
import path from "path";
import __dirname from "../utils.js";

const router = Router();
<<<<<<< HEAD
const c = new cartsManagerFs(path.join(__dirname, "/data/products.json"));
=======
const c = new cartsManager(path.join(__dirname, "/data/products.json"));
>>>>>>> b4c638f7d4e4f83efeb2f4dbfc71dc1ae24daa26

/* Get all carts */

router.get('/all/carts', async (req, res) => {
    try {
        let { all, carts } = req.params;
        let allCarts = await c.getCarts(all, carts);
        if (allCarts === 'Not found') {
            res.status(404).json({ error: 'Cart not found' });
        } else {
            res.json({ allCarts });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});

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