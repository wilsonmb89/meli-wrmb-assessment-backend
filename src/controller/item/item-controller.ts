import { Request, Response } from 'express';
import { Inject } from 'typescript-ioc';

import { ItemService } from '../../service/item-service';

export class ItemController {

  /** Dependency for the item search API call */
  private itemService: ItemService;

  constructor(@Inject itemService: ItemService) {
    this.itemService = itemService;
  }

  /**
   * search item in the MELI API
   * @param req Http request from the listen server event
   * @param res Http response to emit the result value
   */
  public searchItem(req: Request, res: Response): void {
    const { itemId } = req.body;
    try {
      this.itemService.searchItem(itemId as string, res);
    } catch (error) {
      res.send('ERROR: searchItem query failed!');
    }
  }
}