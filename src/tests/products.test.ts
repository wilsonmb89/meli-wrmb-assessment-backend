import request from 'supertest';
import Server from '../classes/server';
import { productsRouter } from '../controller/products';
import { SearchAllEntityRs } from '../entities/products/searchAllRs';

describe('Item services tests', () => {
  const { app } = new Server();

  beforeAll(() => {
    app.use('/products', productsRouter);
  });

  it('should get a items query result from Mercado Libre API without filter category', async () => {
    const payload = {
      query: 'ipod'
    };
    const res = await request(app)
      .post('/products/search')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const body: SearchAllEntityRs = res.body;
    expect(res.status).toBe(200);
    expect(body.items.length).toBeGreaterThan(0);
  });

  it('should get a items query result from Mercado Libre API', async () => {
    const payload = {
      query: 'pelota'
    };
    const res = await request(app)
      .post('/products/search')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const body: SearchAllEntityRs = res.body;
    expect(res.status).toBe(200);
    expect(body.items.length).toBeGreaterThan(0);
  });

  it('should get a null body value from no result query in Mercado Libre API', async () => {
    const payload = {
      itemId: 'asdadasdasdasdasdasd'
    };
    const res = await request(app)
      .post('/products/search')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const body: SearchAllEntityRs = res.body;
    expect(res.status).toBe(200);
    expect(body.items.length).toBe(0);
  });
});
