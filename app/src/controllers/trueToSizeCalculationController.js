const pool = require('../utils/postgresPool')

exports.getTrueToSizeCalculation = async (req, res) => {
  try {
    const results = await pool.query('SELECT AVG(value) as true_to_size_calculation FROM true_to_size WHERE shoe_id = $1', [req.body.shoe_id])
    // console.log(results)
    res.status(200).json(results.rows[0])
  } catch(error) {
    switch (error.code){
      default:
        res.status(500).json({ err: error })
    }
  }
}
