process.env.NODE_ENV = 'test'

const server = require('../server')

// Wait for the server to start before running test suites
before((done) => {
  server.on("started", done)
})
