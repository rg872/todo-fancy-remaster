const mongoose = require('mongoose')
const Schema = mongoose.Schema

const enemySchema = Schema({
    name: {
        type: String,
        unique: true
    },
    hp: Number,
    atk: Number,
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
    },
    image: String
},{
    timestamps:true
})

const Enemy = mongoose.model('Enemy', enemySchema)

module.exports = Enemy