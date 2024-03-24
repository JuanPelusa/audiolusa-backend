import express from "express";
import productManager from "./class/productManager.js";

const app = express();
const PORT = 3000;

const p = new productManager();

/* Get all products */

app.get('/products', async (req, res) => {
    
    let limit = req.query.limit;

    try {
        let products = await p.getProducts(limit);
        res.json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

/* Get product by id */

app.get('/products/:pid', async (req, res) => {

    let { pid } = req.params;
    
    try {
        let product = await p.getProductsById(Number(pid));
        res.json({ product });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
});

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});
