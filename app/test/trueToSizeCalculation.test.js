process.env.NODE_ENV = 'test'

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      server    = require('../server'),
      should    = chai.should(),
      pool      = require('../src/utils/postgresPool'),
      init      = require('./init')

chai.use(chaiHttp)

describe('TrueToSizeCalculation Test', () => {

  let testShoe;
  var requester = chai.request(server).keepOpen()

  beforeEach((done) => {
    pool.query('DELETE FROM true_to_size', [])
    .then(res => {
      return pool.query('DELETE FROM shoe', [])
    }).then(res => {
      return pool.query('INSERT INTO shoe (name) VALUES ($1) RETURNING *', ['addidas Yeezy'])
    }).then(res => {
      testShoe = res.rows[0]
      return Promise.all([
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
      ])
    }).then(response => {
      done()
    }).catch(err => console.error(err.stack))
  })

  describe('GET /true_to_size_calculation/:shoe_id', () => {
    it('it should get a true to size calculation', (done) => {
      requester.get(`/true_to_size_calculation/${testShoe.id}`).send()
      .then(response => {
        response.should.have.status(200)
        response.body.should.have.property('true_to_size_calculation')
        response.body.true_to_size_calculation.should.equal('2.5714285714285714')
        done()
      }).catch(error => {
        console.error(error)
      })
    })
    it('it should get an updated true to size calculation', (done) => {
      requester.post('/true_to_size').send({shoe_id: testShoe.id, value: 2})
      .then(response => {
        return requester.get(`/true_to_size_calculation/${testShoe.id}`).send()
      }).then(response => {
        response.should.have.status(200)
        response.body.should.have.property('true_to_size_calculation')
        response.body.true_to_size_calculation.should.equal('2.5333333333333333')
        requester.close()
        done()
      }).catch(error => {
        console.error(error)
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
