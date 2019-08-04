process.env.NODE_ENV = 'test'

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      server    = require('../server'),
      should    = chai.should(),
      pool      = require('../src/utils/postgresPool')

chai.use(chaiHttp)

describe('Shoe Test', () => {

  beforeEach((done) => {
    pool.query('DELETE FROM shoe', [])
    .then(res => done())
    .catch(err => console.error(err.stack))
  })

  describe('POST /shoe', () => {
    it('it should post a shoe', (done) => {
      let testShoe = { name: "addidas Yeezy" }
      chai.request(server)
        .post('/shoe').send(testShoe).end((error, response) => {
          response.should.have.status(200)
          response.body.should.have.property('name')
          response.body.name.should.equal('addidas Yeezy')
          response.body.should.have.property('id')
          done()
        })
    })

    it('it should get duplicate key error', (done) => {
      let testShoe = { name: "addidas Yeezy" }
      chai.request(server)
        .post('/shoe').send(testShoe).end((error, response) => {
          response.should.have.status(200)
          response.body.should.have.property('name')
          response.body.name.should.equal(testShoe.name)
          response.body.should.have.property('id')
        })
      chai.request(server)
        .post('/shoe').send(testShoe).end((error, response) => {
          response.should.have.status(400)
          response.body.should.have.property('err')
          response.body.err.should.equal('duplicate key error')
          done()
        })
    })
    it('it should get not null violation', (done) => {
      let testShoe = {}
      chai.request(server)
        .post('/shoe').send(testShoe).end((error, response) => {
          response.should.have.status(400)
          response.body.should.have.property('err')
          response.body.err.should.equal('not null violation')
          done()
        })
    })
  })

  after((done) => {
    done()
  })
})
