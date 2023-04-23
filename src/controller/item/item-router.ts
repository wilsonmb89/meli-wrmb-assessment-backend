import { Request, Response, Router } from 'express';
import { Container } from 'typescript-ioc';

import { ItemController } from './item-controller';

const router = Router();

/** Controller definition */
const itemController = Container.get(ItemController);

/** Operations */
/** Search item by item id */
router.post('/itemid', (req: Request, res: Response) => {
  itemController.searchItem(req, res);
});

export { router as itemRouter };