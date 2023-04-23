import { Request, Response, Router } from 'express';
import { Container } from 'typescript-ioc';

import { ProductsController } from './products-controller';

const router = Router();

/** Controller definition */
const productsController = Container.get(ProductsController);

/** Operations */
/** Search products by name query */
router.post('/search', (req: Request, res: Response) => {
  productsController.searchAll(req, res);
});

export { router as productsRouter };
