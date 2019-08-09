const express = require('express')
const { Client } = require('pg')
const bodyParser = require('body-parser')
const shoeRoutes = require('./src/routes/shoeRoutes'),
      trueToSizeRoutes = require('./src/routes/trueToSizeRoutes'),
      trueToSizeCalculationRoutes = require('./src/routes/trueToSizeCalculationRoutes')

var server = express()
const PORT = 3000

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

// Setup the server routes
shoeRoutes(server)
trueToSizeRoutes(server)
trueToSizeCalculationRoutes(server)

const startServer = async () => {
  // We need to make sure the postgres service is running before starting the nodejs api
  let retries = 5
  while(retries){
    console.log("Attempting connection to Postgres...")
    try {
      const client = new Client()
      await client.connect()
      console.log("Connected to Postgres, starting server...")
      server.listen(PORT, () => {
        console.log("Server started successfully")
        server.emit("started") // alerts mocha that the server is started
      })
      break
    } catch (error) {
      console.log(error)
      retries -= 1
      console.log("retires remaining: ", retries)
      await new Promise(resolve => { setTimeout(resolve, 2000) })
      if(retries == 0){
        console.log("unable to connect to postgres")
        process.exit(1)
      }
    }
  }
}

startServer()

module.exports = server // export the server for testing
