const pool = require('../utils/postgresPool')

exports.createTrueToSize = async (req, res) => {
  try {
    const results = await pool.query('INSERT INTO true_to_size (shoe_id, value) VALUES ($1, $2) RETURNING *', [req.body.shoe_id, req.body.value])
    res.status(200).json(results.rows[0])
  } catch(error) {
    switch (error.code){
      case '23502': // not_null_violation
        res.status(400).json({ err: "not null violation" })
        break
      case '23503': // foreign_key_violation
        res.status(400).json({ err: "foreign key violation" })
        break
      case '23514': // check_violation
        res.status(400).json({ err: "check violation" })
        break
      default:
        res.status(500).json({ err: error })
    }
  }
}
