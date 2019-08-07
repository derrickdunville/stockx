module.exports = (server) => {
  let trueToSizeCalculationController = require('../controllers/trueToSizeCalculationController')

  server.route('/true_to_size_calculation/:shoe_id').get(trueToSizeCalculationController.getTrueToSizeCalculation)
}
