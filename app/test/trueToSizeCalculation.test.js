process.env.NODE_ENV = 'test'

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      server    = require('../server'),
      should    = chai.should(),
      pool      = require('../src/utils/postgresPool')

chai.use(chaiHttp)

describe('TrueToSizeCalculation Test', () => {

  let testShoe;

  beforeEach((done) => {
    pool.query('DELETE FROM true_to_size', [])
    .then(res => {
      return pool.query('DELETE FROM shoe', [])
    }).then(res => {
      return pool.query('INSERT INTO shoe (name) VALUES ($1) RETURNING *', ['addidas Yeezy'])
    }).then(res => {
      testShoe = res.rows[0]
      done()
    }).catch(err => console.error(err.stack))
  })

  describe('GET /true_to_size_calculation', () => {
    it('it should get a true to size calculation', (done) => {
      var requester = chai.request(server).keepOpen()
      Promise.all([
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 1}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 3}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 3}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 3}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 4}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 5}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2}),
        requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 3})
      ]).then(response => {
        return requester.get('/true_to_size_calculation').send({shoe_id: testShoe.id})
      }).then(response => {
        response.should.have.status(200)
        response.body.should.have.property('true_to_size_calculation')
        response.body.true_to_size_calculation.should.equal('2.5714285714285714')
        return requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2})
      }).then(response => {
        return requester.get('/true_to_size_calculation').send({shoe_id: testShoe.id})
      }).then(response => {
        response.should.have.status(200)
        response.body.should.have.property('true_to_size_calculation')
        response.body.true_to_size_calculation.should.equal('2.5333333333333333')
        requester.close()
        done()
      }).catch(error => {
        console.log(error)
      })
    })
  })

  after((done) => {
    pool.query('DELETE FROM true_to_size', [])
    .then(res => {
      return pool.query('DELETE FROM shoe', [])
    }).then(res => {
      done()
    }).catch(err => console.error(err.stack))
  })
})
