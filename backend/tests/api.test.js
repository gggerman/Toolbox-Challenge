const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);

describe('API Tests', () => {
  describe('GET /files/data', () => {
    it('should return formatted files data', async () => {
      const res = await chai.request(app).get('/files/data');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });
});
