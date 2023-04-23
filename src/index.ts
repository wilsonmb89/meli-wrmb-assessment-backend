import Server from './classes/server';
import cors from 'cors';

import { productsRouter } from './controller/products';
import { itemRouter } from './controller/item';

const server = new Server();

/** Set CORS Config */
server.app.use(cors({origin: true, credentials: true}));

/** Set routers to handle the controllers of the app */
server.app.use('/products', productsRouter);
server.app.use('/item', itemRouter);

/** Server Init */
server.start(
  () => {
    console.info(`Init server in ${server.port} port.`)
  }
);
