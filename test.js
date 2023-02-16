const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./app');

chai.use(chaiHttp);

describe('Medical Bills API', () => {
  describe('GET /items', () => {
    it('should return an array of medical bills', (done) => {
      chai
        .request(app)
        .get('/items')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /items', () => {
    it('should create a new medical bill', (done) => {
      const newBill = {
        patientName: 'John Doe',
        patientAddress: '123 Main St, Anytown, USA',
        hospitalName: 'General Hospital',
        dateOfService: '2023-02-15',
        billAmount: 1000,
      };
  
      chai
        .request(app)
        .post('/items')
        .send(newBill)
        .end((err, res) => {
          expect(res).to.have.status(201);
//expect(res.body).to.have.property('id');
          expect(res.body.patientName).to.equal(newBill.patientName);
          expect(res.body.patientAddress).to.equal(newBill.patientAddress);
          expect(res.body.hospitalName).to.equal(newBill.hospitalName);
          expect(res.body.dateOfService).to.equal(newBill.dateOfService);
          expect(res.body.billAmount).to.equal(newBill.billAmount);
          done();
        });
    });
  
    it('should return an error for invalid input', (done) => {
      const invalidBill = {
        patientName: 'John Doe',
        patientAddress: '123 Main St, Anytown, USA',
        hospitalName: 'General Hospital',
        billAmount: 1000,
      };
  
      chai
        .request(app)
        .post('/items')
        .send(invalidBill)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.deep.equal({ error: 'Invalid input' });
          done();
        });
    });
  });
});
