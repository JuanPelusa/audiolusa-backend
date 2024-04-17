import { Router } from 'express';
import productManager from '../dao/productManager.js';
import __dirname from '../utils.js';
import path from 'path';


const router = Router();

const p = new productManager();


router.get('/', (req, res) => {
  
  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('home');
});

router.get('/realtimeproducts', (req, res) => {
  let real  
  
  try {
      real = p.getProducts();
    }
    catch {


    }
  res.setHeader('Content-Type', 'text/html');
  res.status(200).render('realTimeProducts', {real});
});

/*router.get('/realTimeProducts', async (req, res) => {
  const products = await p.getProducts();
  return res.render('realTimeProducts', {products});
});*/

export default router