const Enemy = require('../models/enemy.model')

module.exports = {
    getAllEnemy (req, res) {
        Enemy.find({})
        .then(enemies => {
            if(!enemies) {
                res.status(500).json({
                    message: 'server error, cant get enemies'
                })
            } else {
                res.status(200).json({
                    message: 'Success get all enemies',
                    enemies
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
    }
}