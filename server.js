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

// We need to make sure the postgres service is running before
// starting the nodejs api
// const client = new Client()
// client.connect(err => {
//   if (err) {
//     console.log("Postgres Connection Error: ", err.stack)
//   } else {
//     console.log("Connected to Postgres successfully")
//   }
// })

// Start the express server and listen on the defined PORT
server.listen(PORT, () =>
  console.log(`Server running on ${PORT}`
))

// Create a simple GET route
server.get('/', (req, res) =>
  res.status(200).send('hello')
)
