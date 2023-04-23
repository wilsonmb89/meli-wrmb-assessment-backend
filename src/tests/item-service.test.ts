import request from 'supertest';
import Server from '../classes/server';
import { itemRouter } from '../controller/item';
import { SearchItemEntityRs } from '../entities/item/searchItemRs';

describe('Item services tests', () => {
  const { app } = new Server();

  beforeAll(() => {
    app.use('/item', itemRouter);
  });

  it('should get a item from Mercado Libre API', async () => {
    const payload = {
      itemId: 'MLA1256015714'
    };
    const res = await request(app)
      .post('/item/itemid')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const body: SearchItemEntityRs = res.body;
    expect(res.status).toBe(200);
    expect(body.item.id).toEqual('MLA1256015714');
  });

  it('should get a null body value from no result query in Mercado Libre API', async () => {
    const payload = {
      itemId: 'MLAXXXXX'
    };
    const res = await request(app)
      .post('/item/itemid')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const body: SearchItemEntityRs = res.body;
    expect(res.status).toBe(200);
    expect(body).toBeNull();
  });
});
