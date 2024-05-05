import { Router } from 'express';
import cartsManagerMo from '../dao/cartsManagerMo.js';
import { isValidObjectId } from "mongoose";
import path from "path";
import __dirname from "../utils.js";

const router = Router();
const c = new cartsManagerMo(path.join(__dirname, "/data/products.json"));


/* Get all carts */

router.get('/', async (req, res) => {
    try {
        let cart = await c.getCarts();
        res.json({cart})
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
      error: `Enter a valid MongoDB id`,
    });
  }

  try {
    await c.addProducts(cid, pid);
    let cartUpdated = await c.getCartById(cid);
    res.json({ payload: cartUpdated });
  } catch (error) {
    res
      .status(300)
      .json({ error: `error when adding product ${pid} to cart ${cid}` });
  }
});

export default router;