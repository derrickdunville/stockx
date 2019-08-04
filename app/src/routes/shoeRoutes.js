module.exports = (server) => {
  let shoeController = require('../controllers/shoeController')

  server.route('/shoe').post(shoeController.createShoe)
}
