import { Router } from 'express';
import ProductManagerMo from '../dao/ProductManagerMo.js';

const router = Router();
const productManager = new ProductManagerMo();

router.get('/', async (req, res) => {
    
        let { limit, sort, page, ...filters } = req.query;
        let {
          payload: products,
          totalPages,
          prevPage,
          nextPage,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink,
        } = await productManager.getProducts(limit, page, sort, filters);
        res.status(200).render("home", {
          products,
          totalPages,
          prevPage,
          nextPage,
          page,
          hasPrevPage,
          hasNextPage,
          prevLink,
          nextLink,
        });
      });


router.get('/products', async (req, res) => {
    try {
        let {payload:products} = await productManager.getProducts();
        return res.status(200).render('realTime', { products });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

router.get("/chat", (req, res) => {
    res.status(200).render("chat");
  });

export default router;