// I tried to change the database for testing here, but it did not work:

process.env.MONGODB_URI = "test"

let expect = require('chai').expect
let baseUrl = 'http://localhost:4000'
let request = require('superagent')


describe('GET bus data', () => {
  it('returns bus data', (done) => {
    request.get(baseUrl, (req, res) => {
      expect(res.statusCode).to.equal(200)
      console.log(req)
      done();
    })
  })
})

describe('POST bus data', () => {
  it('sending bus data', (done) => {

    let message = {
      time: 1511512585495,
      energy: 85.14600000000002,
      gps: ["52.08940124511719","5.105764865875244"],
      odo: 5.381999999997788,
      speed: 12,
      soc: 88.00000000000007
    }

    request.post(baseUrl)
      .type('json')
      .send(message)
      .end((err, res) => {
            req.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('time');
            res.body.should.have.property('energy');
            res.body.should.have.property('gps');
            res.body.should.have.property('odo');
            res.body.should.have.property('speed');
            res.body.should.have.property('soc');
      })
      done()
  })

});
