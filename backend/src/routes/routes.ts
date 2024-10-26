
import { validationOrder, validationProduct } from '../middleware/validationMiddlewares';
import { getProducts, addProduct, createOrder } from '../controllers/controllers';
import { Router} from 'express';

const router = Router();

router.get('/product', getProducts);

router.post('/product', validationProduct, addProduct)

router.post('/order', validationOrder, createOrder)

export default router;