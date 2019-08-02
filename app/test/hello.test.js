process.env.NODE_ENV = 'test'

const chai      = require('chai'),
      chaiHttp  = require('chai-http'),
      server    = require('../server'),
      should    = chai.should()

chai.use(chaiHttp)

describe('Hello Test', () => {

  before((done) => {
    console.log("testing hello")
    done()
  })

  describe('GET /', () => {
    it('it should return hello', (done) => {
      chai.request(server)
      .get('/').send().end((error, response) => {
        response.text.should.equal("hello world")
        response.should.have.status(200)
        done()
      })
    })
  })

  after((done) => {
    done()
  })
})
