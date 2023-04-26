import { Router } from "express";

const router = Router();

router.get('/', (req,res)=>{
    res.render('home')
})

router.post('/realtimeproducts', (req, res)=>{
    res.render('realtimeprodcuts')
})

export default router;