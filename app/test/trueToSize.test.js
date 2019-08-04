process.env.NODE_ENV = 'test'

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      server    = require('../server'),
      should    = chai.should(),
      pool      = require('../src/utils/postgresPool')

chai.use(chaiHttp)

describe('TrueToSize Test', () => {

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

  describe('POST /true_to_size', () => {
    it('it should post a true to size', (done) => {
      let testTrueToSize = {
        shoe_id: testShoe.id,
        value: 1
      }
      chai.request(server)
        .post('/true_to_size').send(testTrueToSize).end((error, response) => {
          response.should.have.status(200)
          response.body.should.have.property('shoe_id')
          response.body.shoe_id.should.equal(testTrueToSize.shoe_id)
          response.body.should.have.property('value')
          response.body.value.should.equal(testTrueToSize.value)
          done()
        })
    })
    it('it should get foreign key violation', (done) => {
      let testTrueToSize = {
        shoe_id: 2,
        value: 1
      }
      chai.request(server)
        .post('/true_to_size').send(testTrueToSize).end((error, response) => {
          response.should.have.status(400)
          response.body.should.have.property('err')
          response.body.err.should.equal('foreign key violation')
          done()
        })
    })
    it('it should get constraint violation for value < 1', (done) => {
      let testTrueToSize = {
        shoe_id: testShoe.id,
        value: 0
      }
      chai.request(server)
        .post('/true_to_size').send(testTrueToSize).end((error, response) => {
          response.should.have.status(400)
          response.body.should.have.property('err')
          response.body.err.should.equal('check violation')
          done()
        })
    })
    it('it should get constraint violation for value > 5', (done) => {
      let testTrueToSize = {
        shoe_id: testShoe.id,
        value: 6
      }
      chai.request(server)
        .post('/true_to_size').send(testTrueToSize).end((error, response) => {
          response.should.have.status(400)
          response.body.should.have.property('err')
          response.body.err.should.equal('check violation')
          done()
        })
    })
    it('it should get non null violation for value', (done) => {
      let testTrueToSize = {
        shoe_id: testShoe.id,
      }
      chai.request(server)
        .post('/true_to_size').send(testTrueToSize).end((error, response) => {
          response.should.have.status(400)
          response.body.should.have.property('err')
          response.body.err.should.equal('not null violation')
          done()
        })
    })
    it('it should get non null violation for shoe_id', (done) => {
      let testTrueToSize = {
        value: 1
      }
      chai.request(server)
        .post('/true_to_size').send(testTrueToSize).end((error, response) => {
          response.should.have.status(400)
          response.body.should.have.property('err')
          response.body.err.should.equal('not null violation')
          done()
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
