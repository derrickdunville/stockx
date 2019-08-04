module.exports = (server) => {
  let trueToSizeController = require('../controllers/trueToSizeController')

  server.route('/true_to_size').post(trueToSizeController.createTrueToSize)
}
