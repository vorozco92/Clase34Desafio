import { Router } from "express"
import { generateProducts } from "../../src/utils/utils.js";

const router = Router();


router.get('/register',async(req,res)=>{
    res.render('register');
})

router.get('/login',async(req,res)=>{

    if (req.session.user)
        res.redirect('/api/products')
   res.render('login')
})

router.get('/',(req,res)=>{
    if (!req.session.user)
        res.redirect('/login')
    res.render('profile', {user: req.session.user})
 })

 router.get('/reset',async(req,res)=>{
    res.render('reset')
 })

 router.get('/mockingproducts',async(req,res)=>{
    let products = generateProducts();
    res.send(products)
 })

 router.get('/loggerTest',async(req,res)=>{
    req.logger.warning(`Esto es un warning at ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.info(`Esto es logger info at ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.http(`Esto es un HTTP request at ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.fatal(`Esto es un fatal at ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.error(`Esto es un error at ${req.url} - ${new Date().toLocaleTimeString()}`);
    req.logger.debug(`Esto es un debug at ${req.url} - ${new Date().toLocaleTimeString()}`);
    res.status(200).send({status:'success', message: 'Prueba de loggers'})
 })

 export default router;