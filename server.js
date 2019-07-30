const express = require('express')
const { Client } = require('pg')

const server = express()
const PORT = 3000

/* POSTGRES CONNECTION
* create a connection to postgres the connection is established
* using the following environment variables.
*   PGHOST - host addresss where postgres server is located
*   PGPORT - the port postgres is open on at the host
*   PGDATABASE - name of database to connect to
*   PGUSER - username for user with access to postgres database
*   PGPASSWORD - password for user with access to postgres database
*/

const startServer = async () => {
  // We need to make sure the postgres service is running before
  // starting the nodejs api
  let retries = 5
  while(retries){
    console.log("attempting connection to Postgres...")
    try {
      const client = new Client({
        host: 'postgres',
        port: 5432,
        user: 'postgres',
        password: 'postgres'
      })
      await client.connect()
      console.log("connected to postgres")
      server.listen(PORT, () => console.log(`Server running on ${PORT}`))
      // Create a simple GET route
      server.get('/', (req, res) => res.status(200).send('hello world'))
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
