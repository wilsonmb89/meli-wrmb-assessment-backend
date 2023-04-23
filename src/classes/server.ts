import express, { Express, json } from 'express';

/**
 * Class to handle a singleton of Express.app
 */
export default class Server {

  public app: Express;
  public port: number = 8080;

  constructor() {
    this.app = express();

    /** Set json input config */
    this.app.use(json());
  }

  /** Init the server instance */
  start(callback: () => void) {
    this.app.listen(this.port, callback);
  }
}
