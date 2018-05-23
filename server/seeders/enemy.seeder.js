const Seeder = require('mongoose-data-seed').Seeder
const Model = require('../models/enemy.model')

const data = [
  {
    name: 'Orc',
    hp: 150,
    atk: 15,
    difficulty: 'easy',
    image:'https://storage.googleapis.com/todo-fancy/orc.jpg'
  },
  {
    name: 'Golem',
    hp: 300,
    atk: 35,
    difficulty: 'medium',
    image:'https://storage.googleapis.com/todo-fancy/golem.jpg'
  },
  {
    name: 'Reaper',
    hp: 450,
    atk: 65,
    difficulty: 'hard',
    image:'https://storage.googleapis.com/todo-fancy/reaper.png'
  }
]

const EnemySeeder = Seeder.extend({
  shouldRun: function () {
    return Model.count().exec().then(count => count === 0)
  },
  run: function () {
    return Model.create(data)
  }
})

module.exports = { EnemySeeder }
