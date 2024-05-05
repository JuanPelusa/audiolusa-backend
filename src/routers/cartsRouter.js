import { Router } from 'express';
import cartsManagerMo from '../dao/cartsManagerMo.js';
import { isValidObjectId } from "mongoose";

const router = Router();
const c = new cartsManagerMo();


/* Get all carts */

router.get('/', async (req, res) => {
    try {
        let cart = await c.getCarts();
        res.json({cart})
        console.log({ cart })
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});

/* Get a cart by ID */

router.get('/:cid', async (req, res) => {
    
    let { cid } = req.params;
    
    if (!isValidObjectId(cid)) {
      return res.status(400).json({
        error: `Invalid id`,
      });
    }
    
    try {
        let { cid } = req.params;
        let cartid = await c.getCartById(cid);
        if (cartid === 'Not found') {
            res.status(404).json({ error: 'Cart not found' });
        } else {
            res.json({ cartid });
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
        res.status(201).json({ payload: `New cart created`, newCart });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred');
    }
});

/* Add a product to a cart */

router.post('/:cid/product/:pid', async (req, res) => {
    let { cid, pid } = req.params;
    if (!isValidObjectId(cid, pid)) {
        return res.status(400).json({
        error: `Invalid id`,
        });
    }

    try {
        await c.addProductToCart(cid, pid);
        let cartUpdated = await c.getCartById(cid);
        res.json({ payload: `Cart updated`, cartUpdated });
    } catch (error) {
        res.status(300)
        .json({ error: `error when adding product ${pid} to cart ${cid}` });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    if (!isValidObjectId(cid, pid)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    try {
        const updatedCart = await c.removeFromCart(cid, pid);
        res.json({ payload: `Product ${pid} removed from cart ${cid}`, updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    
    let { cid } = req.params;
    
    if (!isValidObjectId(cid)) {
      return res.status(400).json({
        error: `Invalid id`,
      });
    }
    
    try {
        let cart = await c.eraseCart(cid);
        if (cart.deletedCount > 0) {
            let erased = await c.getCarts();
            return res.json({ payload: `Cart ${cid} deleted`, erased });
          } else {
            return res.status(404).json({ error: `Cart ${cid} doesnt exist` });
          }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
    
});

export default router;