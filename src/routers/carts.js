import { Router } from 'express';
import cartManager from '../class/cartManager.js';

const router = Router();


router.get('/:cid', async (req, res) => {
    try {
        let { cid } = req.params;
        res.json({});
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
})

router.post('/', (req, res) => {

        const cManager = new cartManager();
        let result = cManager.buildCart();
        return res.json({ result });

})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        let { cid, pid } = req.params;
        res.json({});
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has occurred');
    }
})

export default router;