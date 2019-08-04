const pool = require('../utils/postgresPool')

exports.createShoe = async (req, res) => {
  try {
    const results = await pool.query('INSERT INTO shoe (name) VALUES ($1) RETURNING *', [req.body.name])
    res.status(200).json(results.rows[0])
  } catch(error) {
    switch(error.code){
      case '23505': // unique_violation
        res.status(400).json({ err: "duplicate key error" })
        break
      case '23502': // not_null_violation
        res.status(400).json({ err: "not null violation" })
        break
      default:
        res.status(500).json({ err: error })
    }
  }
}
