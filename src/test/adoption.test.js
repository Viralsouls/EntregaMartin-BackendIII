import chai from 'chai';
import supertest from 'supertest';
const expect = chai.expect;

const requester = supertest('http://localhost:8080');

describe('Tests funcionales de Adoption Router', () => {
  it('GET /api/adoptions debe devolver todas las adopciones', async () => {
    const res = await requester.get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('POST /api/adoptions debe crear una nueva adopción', async () => {
    const newAdoption = {
      owner: '6767a8f91a1b2c001234abcd',
      pet: '6767a8f91a1b2c001234efgh',
    };
    const res = await requester.post('/api/adoptions').send(newAdoption);
    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body).to.have.property('_id');
  });

  it('GET /api/adoptions/:id debe devolver una adopción específica', async () => {
    const res = await requester.get('/api/adoptions/6767a8f91a1b2c001234abcd');
    expect([200, 404]).to.include(res.status);
  });

  it('DELETE /api/adoptions/:id debe eliminar una adopción', async () => {
    const res = await requester.delete('/api/adoptions/6767a8f91a1b2c001234abcd');
    expect([200, 404]).to.include(res.status);
  });
});