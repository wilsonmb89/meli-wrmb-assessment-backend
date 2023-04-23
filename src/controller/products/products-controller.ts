import { Request, Response } from 'express';
import { Inject } from 'typescript-ioc';

import { ProductsService } from '../../service/products-service';

export class ProductsController {

  /** Dependency for the item search API call */
  private productsService: ProductsService;

  constructor(@Inject productsService: ProductsService) {
    this.productsService = productsService;
  }

  /**
   * search items in the MELI API with a query value
   * @param req Http request from the listen server event
   * @param res Http response to emit the result value
   */
  public searchAll(req: Request, res: Response): void {
    const { query } = req.body;
    try {
      this.productsService.searchAll(query as string, res);
    } catch (error) {
      res.send('ERROR: searchAll query failed!');
    }
  }
}
