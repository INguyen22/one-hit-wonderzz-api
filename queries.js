const Pool = require('pg').Pool
const pool = new Pool({
  user: 'manager',
  host: 'localhost',
  database: 'onehitwonderzz',
  password: 'password',
  port: 5432,
})

const getSongs = (request, response) => {
    pool.query('SELECT * FROM songs ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      const newObject = results.rows.reduce((obj, currentSong) => {
        if(!obj[currentSong.decade]) {
          obj[currentSong.decade] = []
        }
        obj[currentSong.decade].push(currentSong)
        return obj
      }, {})
      response.status(200).json(newObject)
    })
  }

  module.exports = {
    getSongs,
  }